import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Divider,
  Box,
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import SearchIcon from '@mui/icons-material/Search';
import InfoIcon from '@mui/icons-material/Info';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import MovieIcon from '@mui/icons-material/Movie';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import SchoolIcon from '@mui/icons-material/School';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';

const HelpGuideView = () => {
  return (
    <Card sx={{ maxHeight: '100%', overflowY: 'auto', p: 2 }}>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          🎓 Welcome to InK Browser
        </Typography>

        <Typography variant="body1" paragraph>
          <strong>InK Browser</strong> is a visual learning platform that integrates YouTube videos and Knowledge Graphs.
          It enables interactive learning by letting you pause videos, extract keywords from frames, and explore those
          topics in more depth.
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h5" gutterBottom>
          🗺️ Interface Overview
        </Typography>

        <List>
          <ListItem>
            <ListItemIcon><PlayCircleFilledWhiteIcon color="error" /></ListItemIcon>
            <ListItemText
              primary="1. YouTube View"
              secondary="Top-left window. Select 'Video' from the dropdown to play educational content. Pausing the video triggers keyword extraction."
            />
          </ListItem>

          <ListItem>
            <ListItemIcon><SearchIcon color="warning" /></ListItemIcon>
            <ListItemText
              primary="2. Topics Extracted"
              secondary="Top-right window. Displays keywords captured from the paused video frame using OCR and AI techniques."
            />
          </ListItem>

          <ListItem>
            <ListItemIcon><InfoIcon color="primary" /></ListItemIcon>
            <ListItemText
              primary="3. Keyword Description"
              secondary="Bottom-left window. Click any keyword to get detailed definitions and context using Open Knowledge Graph APIs."
            />
          </ListItem>

          <ListItem>
            <ListItemIcon><HelpOutlineIcon color="success" /></ListItemIcon>
            <ListItemText
              primary="4. Help Guide"
              secondary="Bottom-right window (this panel). Offers guidance, tips, and explanations about using the tool effectively."
            />
          </ListItem>
        </List>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h5" gutterBottom>
          🛠️ How to Use (Step-by-Step)
        </Typography>

        <List>
          <ListItem>
            <ListItemIcon><MovieIcon /></ListItemIcon>
            <ListItemText
              primary="Step 1: Select and Play Video"
              secondary="Use the top-left dropdown to select a video to play. Start learning visually."
            />
          </ListItem>

          <ListItem>
            <ListItemIcon><FindInPageIcon /></ListItemIcon>
            <ListItemText
              primary="Step 2: Pause to Extract"
              secondary="Pause the video when you see a topic of interest. The system captures the frame and extracts keywords using OCR."
            />
          </ListItem>

          <ListItem>
            <ListItemIcon><SearchIcon /></ListItemIcon>
            <ListItemText
              primary="Step 3: Explore Keywords"
              secondary="Extracted terms will appear in the 'Topics' panel. Click on them to dive deeper."
            />
          </ListItem>

          <ListItem>
            <ListItemIcon><SchoolIcon /></ListItemIcon>
            <ListItemText
              primary="Step 4: Understand with Open-KG"
              secondary="Detailed descriptions will appear in the 'Keyword Description' panel sourced from trusted Open-KG content."
            />
          </ListItem>

          <ListItem>
            <ListItemIcon><HelpOutlineIcon /></ListItemIcon>
            <ListItemText
              primary="Step 5: Need Help?"
              secondary="This help panel is always available for guidance and tips."
            />
          </ListItem>
        </List>

        <Divider sx={{ my: 3 }} />

        <Alert icon={<TipsAndUpdatesIcon />} severity="info" sx={{ mb: 2 }}>
          💡 <strong>Pro Tip:</strong> You can change the layout of views by using the dropdown in each section.
        </Alert>

        <Alert severity="success" sx={{ mb: 2 }}>
          ✅ Hover over icons and buttons to see tooltips with descriptions!
        </Alert>

        <Alert severity="warning">
          ⚠️ <strong>Need Help?</strong> Reach out to your instructor or check the project documentation for detailed examples.
        </Alert>
      </CardContent>
    </Card>
  );
};

export default HelpGuideView;
