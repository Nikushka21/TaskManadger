/*import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import './App.css';

// Mock-сервисы (в реальном проекте заменить на API-вызовы)
const authService = {
  login: async (email, password) => ({ token: 'mock-token', user: { id: 1, email } }),
  getFriends: async () => [{ id: 2, email: 'friend@example.com' }],
};

const taskService = {
  create: async (task) => ({ ...task, id: Date.now() }),
  update: async (task) => task,
};

const notificationService = {
  send: async (type, recipient, message) => console.log(`Sent ${type} to ${recipient}: ${message}`),
};

function App() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [friends, setFriends] = useState([]);

  // Загрузка данных при авторизации
  useEffect(() => {
    if (user) {
      // Загрузка задач и друзей (заглушка)
      setTasks([
        { id: 1, title: 'Обновить документацию', status: 'open', reminderType: 'once', dueDate: '2023-12-01' },
      ]);
      authService.getFriends().then(setFriends);
    }
  }, [user]);

  // Логин/логаут
  const handleLogin = async (email, password) => {
    const response = await authService.login(email, password);
    setUser(response.user);
  };

  const handleLogout = () => setUser(null);

  // Управление задачами
  const createTask = async (taskData) => {
    const newTask = await taskService.create(taskData);
    setTasks([...tasks, newTask]);
    
    // Отправка уведомления при триггере
    if (taskData.reminderType === 'trigger') {
      notificationService.send('email', user.email, `Создана новая задача: ${taskData.title}`);
    }
  };

  const updateTaskStatus = async (taskId, newStatus) => {
    const updatedTasks = tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
    await taskService.update(updatedTasks.find(t => t.id === taskId));

    // Проверка триггерных задач
    updatedTasks
      .filter(t => t.reminderType === 'trigger' && t.triggerTaskId === taskId)
      .forEach(t => notificationService.send('push', user.email, `Задача-триггер обновлена: ${t.title}`));
  };

  return (
    <Router>
      <div className="app-container">
        {user ? (
          <>
            <header>
              <h1>Task Manager Pro</h1>
              <button onClick={handleLogout}>Выйти</button>
            </header>

            <nav>
              <Link to="/">Главная</Link>
              <Link to="/tasks">Все задачи</Link>
              <Link to="/friends">Друзья</Link>
            </nav>

            <Routes>
              <Route path="/" element={
                <Dashboard 
                  tasks={tasks} 
                  onStatusChange={updateTaskStatus} 
                />
              } />
              <Route path="/tasks" element={
                <TaskManager 
                  tasks={tasks} 
                  onCreate={createTask} 
                  onStatusChange={updateTaskStatus} 
                />
              } />
              <Route path="/friends" element={
                <FriendsManager friends={friends} />
              } />
            </Routes>
          </>
        ) : (
          <AuthPage onLogin={handleLogin} />
        )}
      </div>
    </Router>
  );
}

// Компоненты страниц
function AuthPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="auth-form">
      <h2>Вход в систему</h2>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Пароль" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={() => onLogin(email, password)}>Войти</button>
    </div>
  );
}

function Dashboard({ tasks, onStatusChange }) {
  const upcomingTasks = tasks.filter(t => t.status === 'open');

  return (
    <div className="dashboard">
      <h2>Ближайшие задачи</h2>
      <TaskList tasks={upcomingTasks} onStatusChange={onStatusChange} />
      <Link to="/tasks/new" className="add-button">+ Новая задача</Link>
    </div>
  );
}

function TaskManager({ tasks, onCreate, onStatusChange }) {
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    status: 'open',
    reminderType: 'once',
    notificationMethod: 'email',
    points: 10
  });

  return (
    <div className="task-manager">
      <div className="task-editor">
        <h2>Создать задачу</h2>
        <input 
          placeholder="Название" 
          onChange={(e) => setNewTask({...newTask, title: e.target.value})}
        />
        <select onChange={(e) => setNewTask({...newTask, reminderType: e.target.value})}>
          <option value="once">Один раз</option>
          <option value="daily">Ежедневно</option>
          <option value="interval">С интервалом</option>
          <option value="trigger">По триггеру</option>
        </select>
        <button onClick={() => onCreate(newTask)}>Сохранить</button>
      </div>
      <TaskList tasks={tasks} onStatusChange={onStatusChange} />
    </div>
  );
}

function TaskList({ tasks, onStatusChange }) {
  return (
    <ul className="task-list">
      {tasks.map(task => (
        <li key={task.id} className={`task ${task.status}`}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <div className="task-actions">
            <button onClick={() => onStatusChange(task.id, 'completed')}>Завершить</button>
            <button onClick={() => onStatusChange(task.id, 'closed')}>Закрыть</button>
          </div>
        </li>
      ))}
    </ul>
  );
}

function FriendsManager({ friends }) {
  return (
    <div className="friends-manager">
      <h2>Ваши коллеги</h2>
      <ul>
        {friends.map(friend => (
          <li key={friend.id}>{friend.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
*/
/*import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

// ===== MOCK SERVICES =====
const authService = {
  login: async (email, password) => ({ token: 'mock-token', user: { id: 1, email } }),
  getFriends: async () => [{ id: 2, email: 'friend@example.com' }]
};

const taskService = {
  create: async (task) => ({ ...task, id: Date.now() }),
  update: async (task) => task,
};

const notificationService = {
  send: async (type, recipient, message) =>
    console.log(`🔔 Sent ${type} to ${recipient}: ${message}`)
};

// ===== APP START =====
function App() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [friends, setFriends] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    if (user) {
      setTasks([
        {
          id: 1,
          title: 'Обновить документацию',
          description: 'Обновить документацию проекта',
          status: 'open',
          reminderType: 'once',
          notificationMethod: 'email',
          points: 10,
          dueDate: '2024-12-01'
        }
      ]);
      authService.getFriends().then(setFriends);
    }
  }, [user]);

  const handleLogin = async (email, password) => {
    const response = await authService.login(email, password);
    setUser(response.user);
  };

  const handleLogout = () => setUser(null);

  const createTask = async (taskData) => {
    if (editingTask) {
      const updatedTask = { ...editingTask, ...taskData };
      setTasks(tasks.map(t => t.id === editingTask.id ? updatedTask : t));
      setEditingTask(null);
      await taskService.update(updatedTask);
    } else {
      const newTask = await taskService.create(taskData);
      setTasks([...tasks, newTask]);

      if (taskData.reminderType === 'trigger') {
        notificationService.send(taskData.notificationMethod, user.email, `Создана новая задача: ${taskData.title}`);
      }
    }
  };

  const updateTaskStatus = async (taskId, newStatus) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
    await taskService.update(updatedTasks.find(t => t.id === taskId));

    updatedTasks
      .filter(t => t.reminderType === 'trigger' && t.triggerTaskId === taskId)
      .forEach(t =>
        notificationService.send('push', user.email, `Задача-триггер обновлена: ${t.title}`)
      );
  };

  const addFriend = (email) => {
    if (!email.trim()) return;
    const newFriend = { id: Date.now(), email };
    setFriends([...friends, newFriend]);
  };

  const removeFriend = (id) => {
    setFriends(friends.filter(f => f.id !== id));
  };

  return (
    <Router>
      <div className="app-container">
        {user ? (
          <>
            <header>
              <h1>Task Manager Pro</h1>
              <button onClick={handleLogout}>Выйти</button>
            </header>

            <nav>
              <Link to="/">Главная</Link>
              <Link to="/tasks">Все задачи</Link>
              <Link to="/friends">Друзья</Link>
            </nav>

            <Routes>
              <Route path="/" element={
                <Dashboard tasks={tasks} onStatusChange={updateTaskStatus} />
              } />
              <Route path="/tasks" element={
                <TaskManager
                  tasks={tasks}
                  onCreate={createTask}
                  onStatusChange={updateTaskStatus}
                  onEdit={setEditingTask}
                  editingTask={editingTask}
                />
              } />
              <Route path="/friends" element={
                <FriendsManager
                  friends={friends}
                  onAdd={addFriend}
                  onRemove={removeFriend}
                />
              } />
            </Routes>
          </>
        ) : (
          <AuthPage onLogin={handleLogin} />
        )}
      </div>
    </Router>
  );
}

// ===== COMPONENTS =====

function AuthPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div className="auth-form">
      <h2>Вход в систему</h2>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Пароль" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={() => onLogin(email, password)}>Войти</button>
    </div>
  );
}

function Dashboard({ tasks, onStatusChange }) {
  const upcomingTasks = tasks.filter(t => t.status === 'open');
  const totalPoints = tasks.reduce((sum, t) => sum + (t.points || 0), 0);
  return (
    <div className="dashboard">
      <h2>Ближайшие задачи</h2>
      <TaskList tasks={upcomingTasks} onStatusChange={onStatusChange} />
      <p>Всего задач: {tasks.length}</p>
      <p>Сумма очков: {totalPoints}</p>
      <Link to="/tasks" className="add-button">+ Новая задача</Link>
    </div>
  );
}

function TaskManager({ tasks, onCreate, onStatusChange, onEdit, editingTask }) {
  const [taskData, setTaskData] = useState(editingTask || {
    title: '',
    description: '',
    status: 'open',
    reminderType: 'once',
    notificationMethod: 'email',
    points: 10
  });

  useEffect(() => {
    if (editingTask) setTaskData(editingTask);
  }, [editingTask]);

  return (
    <div className="task-manager">
      <div className="task-editor">
        <h2>{editingTask ? 'Редактировать задачу' : 'Создать задачу'}</h2>
        <input
          placeholder="Название"
          value={taskData.title}
          onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
        />
        <textarea
          placeholder="Описание"
          value={taskData.description}
          onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
        />
        <select value={taskData.reminderType} onChange={(e) => setTaskData({ ...taskData, reminderType: e.target.value })}>
          <option value="once">Один раз</option>
          <option value="daily">Ежедневно</option>
          <option value="interval">С интервалом</option>
          <option value="trigger">По триггеру</option>
        </select>
        <select value={taskData.notificationMethod} onChange={(e) => setTaskData({ ...taskData, notificationMethod: e.target.value })}>
          <option value="email">Email</option>
          <option value="sms">СМС</option>
          <option value="push">Push</option>
        </select>
        <input
          type="number"
          placeholder="Очки"
          value={taskData.points}
          onChange={(e) => setTaskData({ ...taskData, points: parseInt(e.target.value) })}
        />
        <button onClick={() => onCreate(taskData)}>{editingTask ? 'Обновить' : 'Сохранить'}</button>
      </div>
      <TaskList tasks={tasks} onStatusChange={onStatusChange} onEdit={onEdit} />
    </div>
  );
}

function TaskList({ tasks, onStatusChange, onEdit }) {
  return (
    <ul className="task-list">
      {tasks.map(task => (
        <li key={task.id} className={`task ${task.status}`}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <div className="task-actions">
            <button onClick={() => onStatusChange(task.id, 'completed')}>Завершить</button>
            <button onClick={() => onStatusChange(task.id, 'closed')}>Закрыть</button>
            {onEdit && <button onClick={() => onEdit(task)}>Редактировать</button>}
          </div>
        </li>
      ))}
    </ul>
  );
}

function FriendsManager({ friends, onAdd, onRemove }) {
  const [newFriendEmail, setNewFriendEmail] = useState('');

  return (
    <div className="friends-manager">
      <h2>Ваши коллеги</h2>
      <input
        type="email"
        placeholder="Email друга"
        value={newFriendEmail}
        onChange={(e) => setNewFriendEmail(e.target.value)}
      />
      <button onClick={() => {
        onAdd(newFriendEmail);
        setNewFriendEmail('');
      }}>
        Добавить друга
      </button>
      <ul>
        {friends.map(friend => (
          <li key={friend.id}>
            {friend.email}
            <button className="remove-button" onClick={() => onRemove(friend.id)}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
*/
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

const authService = {
  login: async (email, password) => ({ token: 'mock-token', user: { id: 1, email } }),
  getFriends: async () => [{ id: 2, email: 'friend@example.com' }]
};

const taskService = {
  create: async (task) => ({ ...task, id: Date.now() }),
  update: async (task) => task,
};

const notificationService = {
  send: async (type, recipient, message) =>
    console.log(`🔔 Sent ${type} to ${recipient}: ${message}`)
};

function App() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [friends, setFriends] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    if (user) {
      setTasks([
        {
          id: 1,
          title: 'Обновить документацию',
          description: 'Обновить документацию проекта',
          status: 'open',
          reminderType: 'once',
          notificationMethod: 'email',
          points: 10,
          dueDate: '2024-12-01',
          executor: user.email
        }
      ]);
      authService.getFriends().then(setFriends);
    }
  }, [user]);

  const handleLogin = async (email, password) => {
    const response = await authService.login(email, password);
    setUser(response.user);
  };

  const handleLogout = () => setUser(null);

  const createTask = async (taskData) => {
    if (editingTask) {
      const updatedTask = { ...editingTask, ...taskData };
      setTasks(tasks.map(t => t.id === editingTask.id ? updatedTask : t));
      setEditingTask(null);
      await taskService.update(updatedTask);
    } else {
      const newTask = await taskService.create(taskData);
      setTasks([...tasks, newTask]);

      if (taskData.reminderType === 'trigger') {
        notificationService.send(taskData.notificationMethod, user.email, `Создана новая задача: ${taskData.title}`);
      }
    }
  };

  const updateTaskStatus = async (taskId, newStatus) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
    await taskService.update(updatedTasks.find(t => t.id === taskId));

    updatedTasks
      .filter(t => t.reminderType === 'trigger' && t.triggerTaskId === taskId)
      .forEach(t =>
        notificationService.send('push', user.email, `Задача-триггер обновлена: ${t.title}`)
      );
  };

  const addFriend = (email) => {
    if (!email.trim()) return;
    const newFriend = { id: Date.now(), email };
    setFriends([...friends, newFriend]);
  };

  const removeFriend = (id) => {
    setFriends(friends.filter(f => f.id !== id));
  };

  return (
    <Router>
      <div className="app-container">
        {user ? (
          <>
            <header>
              <h1>Task Manager Pro</h1>
              <button onClick={handleLogout}>Выйти</button>
            </header>

            <nav>
              <Link to="/">Главная</Link>
              <Link to="/tasks">Все задачи</Link>
              <Link to="/friends">Друзья</Link>
            </nav>

            <Routes>
              <Route path="/" element={
                <Dashboard tasks={tasks} onStatusChange={updateTaskStatus} />
              } />
              <Route path="/tasks" element={
                <TaskManager
                  tasks={tasks}
                  onCreate={createTask}
                  onStatusChange={updateTaskStatus}
                  onEdit={setEditingTask}
                  editingTask={editingTask}
                  user={user}
                  friends={friends}
                />
              } />
              <Route path="/friends" element={
                <FriendsManager
                  friends={friends}
                  onAdd={addFriend}
                  onRemove={removeFriend}
                />
              } />
            </Routes>
          </>
        ) : (
          <AuthPage onLogin={handleLogin} />
        )}
      </div>
    </Router>
  );
}

function AuthPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div className="auth-form">
      <h2>Вход в систему</h2>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Пароль" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={() => onLogin(email, password)}>Войти</button>
    </div>
  );
}

function Dashboard({ tasks, onStatusChange }) {
  const upcomingTasks = tasks.filter(t => t.status === 'open');
  const totalPoints = tasks.reduce((sum, t) => sum + (t.points || 0), 0);
  return (
    <div className="dashboard">
      <h2>Ближайшие задачи</h2>
      <TaskList tasks={upcomingTasks} onStatusChange={onStatusChange} />
      <p>Всего задач: {tasks.length}</p>
      <p>Сумма очков: {totalPoints}</p>
      <Link to="/tasks" className="add-button">+ Новая задача</Link>
    </div>
  );
}

function TaskManager({ tasks, onCreate, onStatusChange, onEdit, editingTask, user, friends }) {
  const [taskData, setTaskData] = useState(editingTask || {
    title: '',
    description: '',
    status: 'open',
    reminderType: 'once',
    notificationMethod: 'email',
    points: 10,
    executor: user.email
  });

  useEffect(() => {
    if (editingTask) setTaskData(editingTask);
  }, [editingTask]);

  return (
    <div className="task-manager">
      <div className="task-editor">
        <h2>{editingTask ? 'Редактировать задачу' : 'Создать задачу'}</h2>
        <input
          placeholder="Название"
          value={taskData.title}
          onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
        />
        <textarea
          placeholder="Описание"
          value={taskData.description}
          onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
        />
        <select value={taskData.reminderType} onChange={(e) => setTaskData({ ...taskData, reminderType: e.target.value })}>
          <option value="once">Один раз</option>
          <option value="daily">Ежедневно</option>
          <option value="interval">С интервалом</option>
          <option value="trigger">По триггеру</option>
        </select>
        <select value={taskData.notificationMethod} onChange={(e) => setTaskData({ ...taskData, notificationMethod: e.target.value })}>
          <option value="email">Email</option>
          <option value="sms">СМС</option>
          <option value="push">Push</option>
        </select>
        <input
          type="number"
          placeholder="Очки"
          value={taskData.points}
          onChange={(e) => setTaskData({ ...taskData, points: parseInt(e.target.value) })}
        />
        <select
          value={taskData.executor || ''}
          onChange={(e) => setTaskData({ ...taskData, executor: e.target.value })}
        >
          <option value={user.email}>Вы ({user.email})</option>
          {friends.map(friend => (
            <option key={friend.id} value={friend.email}>{friend.email}</option>
          ))}
        </select>
        <button onClick={() => onCreate(taskData)}>{editingTask ? 'Обновить' : 'Сохранить'}</button>
      </div>
      <TaskList tasks={tasks} onStatusChange={onStatusChange} onEdit={onEdit} />
    </div>
  );
}

function TaskList({ tasks, onStatusChange, onEdit }) {
  return (
    <ul className="task-list">
      {tasks.map(task => (
        <li key={task.id} className={`task ${task.status}`}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          {task.executor && <p className="executor-label">👤 Исполнитель: {task.executor}</p>}
          <div className="task-actions">
            <button onClick={() => onStatusChange(task.id, 'completed')}>Завершить</button>
            <button onClick={() => onStatusChange(task.id, 'closed')}>Закрыть</button>
            {onEdit && <button onClick={() => onEdit(task)}>Редактировать</button>}
          </div>
        </li>
      ))}
    </ul>
  );
}

function FriendsManager({ friends, onAdd, onRemove }) {
  const [newFriendEmail, setNewFriendEmail] = useState('');

  return (
    <div className="friends-manager">
      <h2>Ваши коллеги</h2>
      <input
        type="email"
        placeholder="Email друга"
        value={newFriendEmail}
        onChange={(e) => setNewFriendEmail(e.target.value)}
      />
      <button onClick={() => {
        onAdd(newFriendEmail);
        setNewFriendEmail('');
      }}>
        Добавить друга
      </button>
      <ul>
        {friends.map(friend => (
          <li key={friend.id}>
            {friend.email}
            <button className="remove-button" onClick={() => onRemove(friend.id)}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
