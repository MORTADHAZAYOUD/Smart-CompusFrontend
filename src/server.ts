import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

// Middleware for parsing JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS middleware for frontend communication
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Mock database/storage (in production, you'd use a real database)
let users: any[] = [];
let students: any[] = [
  {
    id: 1,
    firstname: 'John',
    lastname: 'Doe',
    email: 'john.doe@example.com',
    dateNaissance: '2000-01-15',
    classe_id: 1,
    classe_name: 'Informatique L3',
    telephone: '+33123456789',
    status: 'active',
    createdAt: new Date()
  }
];
let teachers: any[] = [
  {
    id: 1,
    firstname: 'Marie',
    lastname: 'Martin',
    email: 'marie.martin@school.com',
    specialite: 'Informatique',
    telephone: '+33987654321',
    status: 'active',
    createdAt: new Date()
  }
];
let classes: any[] = [
  {
    id: 1,
    name: 'Informatique L3',
    level: 'Licence 3',
    speciality: 'Informatique',
    capacity: 30,
    currentStudents: 25,
    teacherId: 1,
    teacherName: 'Marie Martin',
    status: 'active'
  }
];
let schedules: any[] = [];
let registrations: any[] = [];

// Authentication endpoints
app.post('/api/register', (req, res) => {
  console.log('Registration request received:', req.body);
  
  const { email, password, firstname, lastname, type, dateNaissance, classe_id, specialite, profession, telephone, childrenNames } = req.body;
  
  // Check if user already exists
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.status(400).json({
      success: false,
      error: 'Un utilisateur avec cet email existe déjà',
      code: 'EMAIL_EXISTS',
      field: 'email'
    });
  }
  
  // Create new user
  const newUser = {
    id: users.length + 1,
    email,
    firstname,
    lastname,
    type,
    dateNaissance,
    classe_id,
    specialite,
    profession,
    telephone,
    childrenNames,
    createdAt: new Date()
  };
  
  users.push(newUser);
  
  res.json({
    success: true,
    message: 'Inscription réussie',
    user: {
      id: newUser.id,
      email: newUser.email,
      firstname: newUser.firstname,
      lastname: newUser.lastname,
      type: newUser.type
    }
  });
});

app.post('/api/login', (req, res) => {
  console.log('Login request received:', req.body);
  
  const { email, password } = req.body;
  
  // Simple login check (in production, verify password hash)
  const user = users.find(u => u.email === email);
  if (user) {
    res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        type: user.type
      },
      token: 'mock-jwt-token'
    });
  } else {
    res.status(401).json({
      success: false,
      error: 'Email ou mot de passe incorrect'
    });
  }
});

// Admin API endpoints
app.get('/api/admin/dashboard/stats', (req, res) => {
  res.json({
    totalStudents: students.length,
    totalTeachers: teachers.length,
    totalClasses: classes.length,
    activeSchedules: schedules.length,
    todayAttendance: 85,
    pendingRegistrations: registrations.filter(r => r.status === 'pending').length,
    monthlyRegistrations: [12, 19, 8, 15, 22, 9, 18, 25, 11, 16, 20, 14],
    attendanceRate: [88, 92, 85, 90, 87, 94, 89]
  });
});

app.get('/api/admin/dashboard/activities', (req, res) => {
  res.json([
    {
      id: 1,
      type: 'registration',
      message: 'Nouvelle inscription de John Doe',
      timestamp: new Date(),
      user: 'John Doe'
    },
    {
      id: 2,
      type: 'login',
      message: 'Connexion de Marie Martin',
      timestamp: new Date(),
      user: 'Marie Martin'
    }
  ]);
});

// Student management endpoints
app.get('/api/admin/students', (req, res) => {
  res.json(students);
});

app.get('/api/admin/students/:id', (req, res) => {
  const student = students.find(s => s.id === parseInt(req.params.id));
  if (student) {
    res.json(student);
  } else {
    res.status(404).json({ error: 'Student not found' });
  }
});

app.post('/api/admin/students', (req, res) => {
  const newStudent = {
    id: students.length + 1,
    ...req.body,
    createdAt: new Date()
  };
  students.push(newStudent);
  res.status(201).json(newStudent);
});

app.put('/api/admin/students/:id', (req, res) => {
  const index = students.findIndex(s => s.id === parseInt(req.params.id));
  if (index !== -1) {
    students[index] = { ...students[index], ...req.body };
    res.json(students[index]);
  } else {
    res.status(404).json({ error: 'Student not found' });
  }
});

app.delete('/api/admin/students/:id', (req, res) => {
  const index = students.findIndex(s => s.id === parseInt(req.params.id));
  if (index !== -1) {
    students.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ error: 'Student not found' });
  }
});

app.patch('/api/admin/students/:id/suspend', (req, res) => {
  const student = students.find(s => s.id === parseInt(req.params.id));
  if (student) {
    student.status = 'suspended';
    res.status(204).send();
  } else {
    res.status(404).json({ error: 'Student not found' });
  }
});

// Teacher management endpoints
app.get('/api/admin/teachers', (req, res) => {
  res.json(teachers);
});

app.get('/api/admin/teachers/:id', (req, res) => {
  const teacher = teachers.find(t => t.id === parseInt(req.params.id));
  if (teacher) {
    res.json(teacher);
  } else {
    res.status(404).json({ error: 'Teacher not found' });
  }
});

app.post('/api/admin/teachers', (req, res) => {
  const newTeacher = {
    id: teachers.length + 1,
    ...req.body,
    createdAt: new Date()
  };
  teachers.push(newTeacher);
  res.status(201).json(newTeacher);
});

app.put('/api/admin/teachers/:id', (req, res) => {
  const index = teachers.findIndex(t => t.id === parseInt(req.params.id));
  if (index !== -1) {
    teachers[index] = { ...teachers[index], ...req.body };
    res.json(teachers[index]);
  } else {
    res.status(404).json({ error: 'Teacher not found' });
  }
});

app.delete('/api/admin/teachers/:id', (req, res) => {
  const index = teachers.findIndex(t => t.id === parseInt(req.params.id));
  if (index !== -1) {
    teachers.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ error: 'Teacher not found' });
  }
});

// Class management endpoints
app.get('/api/admin/classes', (req, res) => {
  res.json(classes);
});

app.get('/api/admin/classes/:id', (req, res) => {
  const classInfo = classes.find(c => c.id === parseInt(req.params.id));
  if (classInfo) {
    res.json(classInfo);
  } else {
    res.status(404).json({ error: 'Class not found' });
  }
});

app.post('/api/admin/classes', (req, res) => {
  const newClass = {
    id: classes.length + 1,
    ...req.body,
    currentStudents: 0
  };
  classes.push(newClass);
  res.status(201).json(newClass);
});

app.put('/api/admin/classes/:id', (req, res) => {
  const index = classes.findIndex(c => c.id === parseInt(req.params.id));
  if (index !== -1) {
    classes[index] = { ...classes[index], ...req.body };
    res.json(classes[index]);
  } else {
    res.status(404).json({ error: 'Class not found' });
  }
});

app.delete('/api/admin/classes/:id', (req, res) => {
  const index = classes.findIndex(c => c.id === parseInt(req.params.id));
  if (index !== -1) {
    classes.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ error: 'Class not found' });
  }
});

// Schedule management endpoints
app.get('/api/admin/schedules', (req, res) => {
  res.json(schedules);
});

app.post('/api/admin/schedules', (req, res) => {
  const newSchedule = {
    id: schedules.length + 1,
    ...req.body,
    createdAt: new Date()
  };
  schedules.push(newSchedule);
  res.status(201).json(newSchedule);
});

app.put('/api/admin/schedules/:id', (req, res) => {
  const index = schedules.findIndex(s => s.id === parseInt(req.params.id));
  if (index !== -1) {
    schedules[index] = { ...schedules[index], ...req.body };
    res.json(schedules[index]);
  } else {
    res.status(404).json({ error: 'Schedule not found' });
  }
});

app.delete('/api/admin/schedules/:id', (req, res) => {
  const index = schedules.findIndex(s => s.id === parseInt(req.params.id));
  if (index !== -1) {
    schedules.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ error: 'Schedule not found' });
  }
});

// Reports endpoints
app.get('/api/admin/reports/attendance', (req, res) => {
  const { start, end } = req.query;
  res.json({
    period: { start, end },
    totalClasses: 45,
    attendedClasses: 38,
    rate: 84.4,
    details: [
      { date: '2024-01-15', subject: 'Math', attended: 28, total: 30 },
      { date: '2024-01-16', subject: 'Physics', attended: 25, total: 30 }
    ]
  });
});

app.get('/api/admin/reports/grades', (req, res) => {
  const { classId, subject } = req.query;
  res.json({
    classId,
    subject,
    averageGrade: 14.5,
    grades: [
      { studentId: 1, studentName: 'John Doe', grade: 16 },
      { studentId: 2, studentName: 'Jane Smith', grade: 13 }
    ]
  });
});

app.get('/api/admin/reports/registrations', (req, res) => {
  res.json({
    total: users.length,
    thisMonth: users.filter(u => {
      const userDate = new Date(u.createdAt);
      const now = new Date();
      return userDate.getMonth() === now.getMonth() && userDate.getFullYear() === now.getFullYear();
    }).length,
    byType: {
      student: users.filter(u => u.type === 'student').length,
      teacher: users.filter(u => u.type === 'teacher').length,
      parent: users.filter(u => u.type === 'parent').length
    }
  });
});

// Settings endpoints
app.get('/api/admin/settings', (req, res) => {
  res.json({
    schoolName: 'Smart Campus',
    academicYear: '2023-2024',
    emailNotifications: true,
    smsNotifications: false,
    language: 'fr',
    timezone: 'Europe/Paris'
  });
});

app.put('/api/admin/settings', (req, res) => {
  res.json({ ...req.body, updated: true });
});

// Pending registrations
app.get('/api/admin/registrations/pending', (req, res) => {
  res.json(registrations.filter(r => r.status === 'pending'));
});

// Student API endpoints (for student dashboard and services)
app.get('/api/student/profile', (req, res) => {
  // In a real app, you'd get the student ID from the JWT token
  const studentProfile = {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+33123456789',
    dateOfBirth: '2000-01-15',
    studentId: 'STU2024001',
    program: 'Computer Science',
    year: 3,
    semester: 1,
    profilePicture: 'https://via.placeholder.com/150'
  };
  res.json(studentProfile);
});

app.put('/api/student/profile', (req, res) => {
  // Update student profile
  res.json({ ...req.body, updated: true });
});

app.get('/api/student/dashboard/stats', (req, res) => {
  res.json({
    globalAverage: 15.2,
    attendanceRate: 92.5,
    totalSubjects: 8,
    upcomingExams: 3,
    unreadMessages: 5,
    unreadNotifications: 2
  });
});

app.get('/api/student/grades', (req, res) => {
  res.json([
    { id: 1, subject: 'Mathematics', subjectCode: 'MATH301', grade: 16, maxGrade: 20, examType: 'Midterm', date: '2024-01-15', teacher: 'Prof. Johnson', coefficient: 2 },
    { id: 2, subject: 'Physics', subjectCode: 'PHYS201', grade: 14, maxGrade: 20, examType: 'Quiz', date: '2024-01-12', teacher: 'Dr. Smith', coefficient: 1 },
    { id: 3, subject: 'Computer Science', subjectCode: 'CS401', grade: 18, maxGrade: 20, examType: 'Project', date: '2024-01-10', teacher: 'Prof. Wilson', coefficient: 3 },
    { id: 4, subject: 'Chemistry', subjectCode: 'CHEM201', grade: 13, maxGrade: 20, examType: 'Lab Report', date: '2024-01-08', teacher: 'Dr. Brown', coefficient: 1 },
    { id: 5, subject: 'Mathematics', subjectCode: 'MATH301', grade: 15, maxGrade: 20, examType: 'Quiz', date: '2024-01-05', teacher: 'Prof. Johnson', coefficient: 1 },
    { id: 6, subject: 'English', subjectCode: 'ENG102', grade: 17, maxGrade: 20, examType: 'Essay', date: '2024-01-03', teacher: 'Ms. Davis', coefficient: 2 }
  ]);
});

app.get('/api/student/attendance', (req, res) => {
  res.json([
    { id: 1, date: '2024-01-15', subject: 'Mathematics', subjectCode: 'MATH301', status: 'present', teacher: 'Prof. Johnson', sessionType: 'Lecture', duration: 90 },
    { id: 2, date: '2024-01-15', subject: 'Physics', subjectCode: 'PHYS201', status: 'present', teacher: 'Dr. Smith', sessionType: 'Lab', duration: 120 },
    { id: 3, date: '2024-01-14', subject: 'Computer Science', subjectCode: 'CS401', status: 'absent', teacher: 'Prof. Wilson', sessionType: 'Lecture', duration: 90 },
    { id: 4, date: '2024-01-14', subject: 'Chemistry', subjectCode: 'CHEM201', status: 'justified', teacher: 'Dr. Brown', sessionType: 'Lab', duration: 120 },
    { id: 5, date: '2024-01-13', subject: 'Mathematics', subjectCode: 'MATH301', status: 'late', teacher: 'Prof. Johnson', sessionType: 'Tutorial', duration: 60 },
    { id: 6, date: '2024-01-13', subject: 'English', subjectCode: 'ENG102', status: 'present', teacher: 'Ms. Davis', sessionType: 'Lecture', duration: 90 }
  ]);
});

app.get('/api/student/schedule', (req, res) => {
  res.json([
    { id: 1, subject: 'Mathematics', subjectCode: 'MATH301', teacher: 'Prof. Johnson', room: 'A101', dayOfWeek: 1, startTime: '09:00', endTime: '10:30', sessionType: 'Lecture' },
    { id: 2, subject: 'Physics', subjectCode: 'PHYS201', teacher: 'Dr. Smith', room: 'B205', dayOfWeek: 1, startTime: '14:00', endTime: '16:00', sessionType: 'Lab' },
    { id: 3, subject: 'Computer Science', subjectCode: 'CS401', teacher: 'Prof. Wilson', room: 'C301', dayOfWeek: 2, startTime: '10:00', endTime: '11:30', sessionType: 'Lecture' },
    { id: 4, subject: 'Chemistry', subjectCode: 'CHEM201', teacher: 'Dr. Brown', room: 'D102', dayOfWeek: 2, startTime: '15:00', endTime: '17:00', sessionType: 'Lab' },
    { id: 5, subject: 'English', subjectCode: 'ENG102', teacher: 'Ms. Davis', room: 'E201', dayOfWeek: 3, startTime: '11:00', endTime: '12:30', sessionType: 'Lecture' },
    { id: 6, subject: 'Mathematics', subjectCode: 'MATH301', teacher: 'Prof. Johnson', room: 'A101', dayOfWeek: 3, startTime: '14:00', endTime: '15:30', sessionType: 'Tutorial' },
    { id: 7, subject: 'Physics', subjectCode: 'PHYS201', teacher: 'Dr. Smith', room: 'B205', dayOfWeek: 4, startTime: '09:00', endTime: '10:30', sessionType: 'Lecture' },
    { id: 8, subject: 'Computer Science', subjectCode: 'CS401', teacher: 'Prof. Wilson', room: 'C301', dayOfWeek: 4, startTime: '13:00', endTime: '15:00', sessionType: 'Lab' },
    { id: 9, subject: 'Chemistry', subjectCode: 'CHEM201', teacher: 'Dr. Brown', room: 'D102', dayOfWeek: 5, startTime: '10:00', endTime: '11:30', sessionType: 'Lecture' },
    { id: 10, subject: 'English', subjectCode: 'ENG102', teacher: 'Ms. Davis', room: 'E201', dayOfWeek: 5, startTime: '15:00', endTime: '16:30', sessionType: 'Tutorial' }
  ]);
});

app.get('/api/student/sessions', (req, res) => {
  res.json([
    { id: 1, subject: 'Mathematics', subjectCode: 'MATH301', teacher: 'Prof. Johnson', room: 'A101', date: '2024-01-16', startTime: '09:00', endTime: '10:30', sessionType: 'Lecture', description: 'Calculus III - Integration by parts' },
    { id: 2, subject: 'Physics', subjectCode: 'PHYS201', teacher: 'Dr. Smith', room: 'B205', date: '2024-01-16', startTime: '14:00', endTime: '16:00', sessionType: 'Lab', description: 'Optics laboratory experiment' },
    { id: 3, subject: 'Computer Science', subjectCode: 'CS401', teacher: 'Prof. Wilson', room: 'C301', date: '2024-01-17', startTime: '10:00', endTime: '11:30', sessionType: 'Lecture', description: 'Advanced Algorithms - Dynamic Programming' },
    { id: 4, subject: 'Chemistry', subjectCode: 'CHEM201', teacher: 'Dr. Brown', room: 'D102', date: '2024-01-17', startTime: '15:00', endTime: '17:00', sessionType: 'Lab', description: 'Organic synthesis practical' },
    { id: 5, subject: 'English', subjectCode: 'ENG102', teacher: 'Ms. Davis', room: 'E201', date: '2024-01-18', startTime: '11:00', endTime: '12:30', sessionType: 'Lecture', description: 'Modern Literature Analysis' }
  ]);
});

app.get('/api/student/notifications', (req, res) => {
  res.json([
    { id: 1, title: 'New Grade Posted', content: 'Your Mathematics midterm grade has been posted.', date: '2024-01-15', type: 'info', isRead: false, actionUrl: '/student/grades' },
    { id: 2, title: 'Class Cancelled', content: 'Physics lab session on 2024-01-18 has been cancelled.', date: '2024-01-14', type: 'warning', isRead: false },
    { id: 3, title: 'Assignment Due', content: 'Computer Science project is due in 3 days.', date: '2024-01-13', type: 'warning', isRead: true },
    { id: 4, title: 'Registration Success', content: 'You have been successfully registered for the new semester.', date: '2024-01-10', type: 'success', isRead: true }
  ]);
});

app.patch('/api/student/notifications/:id/read', (req, res) => {
  // Mark notification as read
  res.json({ success: true });
});

// Teacher API endpoints (basic structure for future use)
app.get('/api/teacher/profile', (req, res) => {
  res.json({
    id: 1,
    firstName: 'Marie',
    lastName: 'Martin',
    email: 'marie.martin@school.com',
    specialite: 'Informatique',
    telephone: '+33987654321',
    profilePicture: 'https://via.placeholder.com/150'
  });
});

app.get('/api/teacher/classes', (req, res) => {
  res.json([
    { id: 1, name: 'Informatique L3', level: 'Licence 3', studentCount: 25 },
    { id: 2, name: 'Informatique L2', level: 'Licence 2', studentCount: 30 }
  ]);
});

// Parent API endpoints (basic structure for future use)
app.get('/api/parent/profile', (req, res) => {
  res.json({
    id: 1,
    firstName: 'Robert',
    lastName: 'Doe',
    email: 'robert.doe@email.com',
    telephone: '+33555123456',
    profession: 'Engineer',
    children: [
      { id: 1, name: 'John Doe', class: 'Informatique L3' }
    ]
  });
});

app.get('/api/parent/children/:childId/grades', (req, res) => {
  // Return child's grades
  res.json([
    { subject: 'Mathematics', grade: 16, date: '2024-01-15' },
    { subject: 'Physics', grade: 14, date: '2024-01-12' }
  ]);
});

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use('/**', (req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 8000.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 8000;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
    console.log(`API endpoints available at http://localhost:${port}/api`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
