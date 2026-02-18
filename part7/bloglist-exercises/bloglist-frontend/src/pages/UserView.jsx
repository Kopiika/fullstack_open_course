import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const UserView = () => {
	const { id } = useParams();

  const users = useSelector((state) => state.users);
  const user = users.find((u) => u.id === id);

  if (!user) {
    return <div>User not found</div>;
  }

	return (
    <Card sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {user.name}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ mt: 2, mb: 1, fontWeight: 500 }}
          color="text.secondary"
        >
          Added blogs:
        </Typography>
        <List>
          {user.blogs.map((blog, index) => (
            <div key={blog.id}>
              <ListItem disablePadding>
                <ListItemButton component={RouterLink} to={`/blogs/${blog.id}`}>
                  <ListItemText
                    primary={blog.title}
                    sx={{ textTransform: 'capitalize' }}
                  />
                </ListItemButton>
              </ListItem>
              {index !== user.blogs.length - 1 && <Divider />}
            </div>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default UserView;