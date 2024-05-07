import React, { useState } from 'react';
import { TextField, Button, List, ListItem, ListItemText, IconButton, Checkbox, Paper, MenuItem, Select, Grid, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useGlobalState, GlobalState } from '../context/GlobalState';

function TodoComponent() {
    const globalState = useGlobalState();
    const [input, setInput] = useState('');
    const [editId, setEditId] = useState(null);
    const [priority, setPriority] = useState('low'); // Default priority

    const handleAddTodo = () => {
        if (!editId && input) {
            const newTask = { id: Date.now(), text: input, completed: false, priority: priority };
            GlobalState.set({
                todos: [...globalState.todos, newTask]
            }, `Added Task: '${input}', Priority: '${priority}', Completed: ${newTask.completed}`);
            setInput('');
        } else if (editId) {
            const oldTask = globalState.todos.find(task => task.id === editId);
            const updatedTask = { ...oldTask, text: input, priority: priority };
            const updatedTodos = globalState.todos.map(task =>
                task.id === editId ? updatedTask : task
            );
            GlobalState.set({ todos: updatedTodos }, `Modified Task from '${oldTask.text}' to '${input}', Priority from '${oldTask.priority}' to '${priority}', Completed: ${updatedTask.completed}`);
            setEditId(null);
            setInput('');
        }
    };

    const handleRemoveTodo = (todoId) => {
        const task = globalState.todos.find(task => task.id === todoId);
        GlobalState.set({
            todos: globalState.todos.filter(task => task.id !== todoId),
        }, `Removed Task: '${task.text}', Priority: '${task.priority}', Completed: ${task.completed}`);
    };

    const handleEditTodo = (todo) => {
        setInput(todo.text);
        setPriority(todo.priority);
        setEditId(todo.id);
    };

    const toggleComplete = (todoId) => {
        const task = globalState.todos.find(task => task.id === todoId);
        const updatedTask = { ...task, completed: !task.completed };
        const updatedTodos = globalState.todos.map(task =>
            task.id === todoId ? updatedTask : task
        );
        GlobalState.set({ todos: updatedTodos }, `Toggled Task Completion for '${task.text}', Priority: '${task.priority}', New Completed Status: ${updatedTask.completed}`);
    };

    const priorities = ['high', 'medium', 'low']; // Reordered priorities

    const priorityColors = {
        high: 'red',
        medium: 'yellow',
        low: 'green',
    };

    return (
        <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4, mx: 'auto', width: '80%' }}>
            <Typography variant="h3">Task Manager</Typography>
            <Grid container spacing={2} sx={{ width: '100%', alignItems: 'center' }}>
                <Grid item xs={9}>
                    <TextField
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        label="Add/Edit a task"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                    />
                </Grid>
                <Grid item xs={3}>
                    <Select
                        value={priority}
                        onChange={e => setPriority(e.target.value)}
                        fullWidth
                        margin="normal"
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                        sx={{ minWidth: '90px' }} // Adjusted width for the Select component
                    >
                        {priorities.map((level) => (
                            <MenuItem key={level} value={level}>{level.charAt(0).toUpperCase() + level.slice(1)} Priority</MenuItem>
                        ))}
                    </Select>
                </Grid>
            </Grid>
            <Button onClick={handleAddTodo} color="primary" variant="contained" sx={{ mb: 1, width: '100%' }}>
                {editId ? 'Update Task' : 'Add Task'}
            </Button>
            <Grid container spacing={6} sx={{ width: '100%' }}>
                {priorities.map((level) => (
                    <Grid item xs={12} sm={4} key={level}>
                        <Typography variant="h6" color="textPrimary" sx={{ textAlign: 'center', marginBottom: 1 }}>
                            {level.charAt(0).toUpperCase() + level.slice(1)} Priority
                        </Typography>
                        <List sx={{
                            maxHeight: 400,
                            overflow: 'auto',
                            border: 1,
                            borderColor: priorityColors[level], // Assigning color based on priority
                            bgcolor: `${level}.light`,
                            borderRadius: 2,
                            p: 1,
                            width: '100%' // Adjusted width for each list container
                        }}>
                            {globalState.todos.filter(todo => todo.priority === level).map((todo) => (
                                <ListItem key={todo.id} secondaryAction={
                                    <>
                                        <IconButton onClick={() => handleEditTodo(todo)}><EditIcon /></IconButton>
                                        <IconButton onClick={() => handleRemoveTodo(todo.id)}><DeleteIcon /></IconButton>
                                    </>
                                }>
                                    <Checkbox
                                        edge="start"
                                        checked={todo.completed}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{ 'aria-labelledby': todo.id }}
                                        onChange={() => toggleComplete(todo.id)}
                                    />
                                    <ListItemText primary={todo.text} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }} />
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                ))}
            </Grid>
        </Paper>
    );
}

export default TodoComponent;
