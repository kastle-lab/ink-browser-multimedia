import React from 'react';
// Importing UI components and utilities from Material UI (MUI).
// MUI provides ready-to-use components like Card, Typography, Lists, Alerts, etc.
// These help in quickly creating a clean and consistent interface.
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

// Importing icons from Material UI Icons package.
// Icons are used here to make each section visually distinct and easier to understand.
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import SearchIcon from '@mui/icons-material/Search';
import InfoIcon from '@mui/icons-material/Info';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import MovieIcon from '@mui/icons-material/Movie';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import SchoolIcon from '@mui/icons-material/School';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';

/**
 * HelpGuideView Component
 *
 * This is a React functional component that shows a "Help Guide" panel
 * inside the InK Browser application.
 *
 * Purpose:
 * --------
 * - To introduce new users (especially students) to the interface.
 * - To provide a step-by-step guide on how to use the application.
 * - To give quick tips, alerts, and warnings to enhance the learning experience.
 *
 * Structure of this component:
 * ----------------------------
 * 1. A Card container that holds everything.
 * 2. An introduction with the project name and description.
 * 3. A section explaining the 4 main panels of the interface.
 * 4. A step-by-step guide on how to use the application.
 * 5. Helpful alerts/tips at the bottom.
 *
 * Note for students:
 * ------------------
 * - This component is purely for displaying information (no complex logic).
 * - Focus is on layout and user guidance.
 */
const HelpGuideView = () => {
  return (
    // Card acts as the main container box with padding and scroll enabled.
    <Card sx={{ maxHeight: '100%', overflowY: 'auto', p: 2 }}>
      <CardContent>
        {/* Main Title: Welcomes the user to the application */}
        <Typography variant="h4" gutterBottom>
          🎓 Welcome to InK Browser
        </Typography>

        {/* Introductory text: Explains what InK Browser is and what it does */}
        <Typography variant="body1" paragraph>
          <strong>InK Browser</strong> is a visual learning platform that integrates YouTube videos and Knowledge Graphs.
          It enables interactive learning by letting you pause videos, extract keywords from frames, and explore those
          topics in more depth.
        </Typography>

        {/* Divider = a horizontal line to visually separate sections */}
        <Divider sx={{ my: 2 }} />

        {/* Section: Interface Overview */}
        <Typography variant="h5" gutterBottom>
          🗺️ Interface Overview
        </Typography>

        {/* List of the 4 main panels in the interface */}
        <List>
          {/* Panel 1: YouTube view (top-left) */}
          <ListItem>
            <ListItemIcon><PlayCircleFilledWhiteIcon color="error" /></ListItemIcon>
            <ListItemText
              primary="1. YouTube View"
              secondary="Top-left window. Select 'Video' from the dropdown to play educational content. Pausing the video triggers keyword extraction."
            />
          </ListItem>

          {/* Panel 2: Topics extracted (top-right) */}
          <ListItem>
            <ListItemIcon><SearchIcon color="warning" /></ListItemIcon>
            <ListItemText
              primary="2. Topics Extracted"
              secondary="Top-right window. Displays keywords captured from the paused video frame using OCR and AI techniques."
            />
          </ListItem>

          {/* Panel 3: Keyword description (bottom-left) */}
          <ListItem>
            <ListItemIcon><InfoIcon color="primary" /></ListItemIcon>
            <ListItemText
              primary="3. Keyword Description"
              secondary="Bottom-left window. Click any keyword to get detailed definitions and context using Open Knowledge Graph APIs."
            />
          </ListItem>

          {/* Panel 4: Help guide (bottom-right) */}
          <ListItem>
            <ListItemIcon><HelpOutlineIcon color="success" /></ListItemIcon>
            <ListItemText
              primary="4. Help Guide"
              secondary="Bottom-right window (this panel). Offers guidance, tips, and explanations about using the tool effectively."
            />
          </ListItem>
        </List>

        {/* Divider before next section */}
        <Divider sx={{ my: 3 }} />

        {/* Section: Step-by-step instructions */}
        <Typography variant="h5" gutterBottom>
          🛠️ How to Use (Step-by-Step)
        </Typography>

        <List>
          {/* Step 1: Select and play a video */}
          <ListItem>
            <ListItemIcon><MovieIcon /></ListItemIcon>
            <ListItemText
              primary="Step 1: Select and Play Video"
              secondary="Use the top-left dropdown to select a video to play. Start learning visually."
            />
          </ListItem>

          {/* Step 2: Pause video to extract keywords */}
          <ListItem>
            <ListItemIcon><FindInPageIcon /></ListItemIcon>
            <ListItemText
              primary="Step 2: Pause to Extract"
              secondary="Pause the video when you see a topic of interest. The system captures the frame and extracts keywords using OCR."
            />
          </ListItem>

          {/* Step 3: Explore extracted keywords */}
          <ListItem>
            <ListItemIcon><SearchIcon /></ListItemIcon>
            <ListItemText
              primary="Step 3: Explore Keywords"
              secondary="Extracted terms will appear in the 'Topics' panel. Click on them to dive deeper."
            />
          </ListItem>

          {/* Step 4: Read detailed descriptions */}
          <ListItem>
            <ListItemIcon><SchoolIcon /></ListItemIcon>
            <ListItemText
              primary="Step 4: Understand with Open-KG"
              secondary="Detailed descriptions will appear in the 'Keyword Description' panel sourced from trusted Open-KG content."
            />
          </ListItem>

          {/* Step 5: Use help panel */}
          <ListItem>
            <ListItemIcon><HelpOutlineIcon /></ListItemIcon>
            <ListItemText
              primary="Step 5: Need Help?"
              secondary="This help panel is always available for guidance and tips."
            />
          </ListItem>
        </List>

        {/* Divider before the tips/alerts */}
        <Divider sx={{ my: 3 }} />

        {/* Helpful alerts for students */}
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

// Exporting the component so it can be imported and used in other files.
export default HelpGuideView;
