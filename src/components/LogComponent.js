import React from 'react';
import { List, ListItem, Typography, Paper, Box } from '@mui/material';
import { useGlobalState } from '../context/GlobalState';

function LogComponent() {
    const globalState = useGlobalState();

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', width: '100%', mt: 5
        }}>
            <Paper sx={{width: '80%', maxWidth: 600, p: 3, m: 'auto', display: 'block'
            }}>
                <Typography variant="h3" sx={{ textAlign: 'center', mb: 2 }}>Activity Log</Typography>
                <List sx={{ maxHeight: 300, overflow: 'auto' }}>
                    {globalState.logs.map((log, index) => (
                        <ListItem key={index}>
                            <Typography variant="body2">
                                {log.timestamp} - {log.logMessage}
                            </Typography>
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </Box>
    );
}

export default LogComponent;
