import * as PostsService from "@/services/posts";
import * as ProfileService from "@/services/profile";
import { useAuth } from "@/hooks/use-auth";
import { 
  Delete, 
  FormatAlignLeft, 
  Mode
} from "@mui/icons-material";
import { 
  Container, 
  Paper, 
  TableContainer, 
  Table,
  TableHead, 
  TableCell, 
  TableBody, 
  TableRow, 
  Button 
} from "@mui/material";
import { 
  useEffect,
  useState 
} from "react";
import { useNavigate } from "react-router";

function DashboardPage() {
  const [posts, setPosts] = useState<PostsService.PostList>({ posts: [] });
  const { user, signed } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function getUser() {
      const user = await ProfileService.getCurrentUser();
      return user;
    }

    async function getPosts() {
      const posts = await PostsService.getAllPosts((await getUser()).id);
            
      setPosts(posts);
    }

    getPosts();
  }, [navigate, signed]);

  const postList = posts.posts?.map(post => (
    <TableRow
      key={post.id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {post.title}
      </TableCell>
      <TableCell align="right">{post.createdAt}</TableCell>
      <TableCell />
      <TableCell align="right">
        <Button variant="contained" endIcon={<FormatAlignLeft />} onClick={() => {
          navigate("/posts/" + post.id)
        }}>Detalhes</Button>
      </TableCell>
      <TableCell align="right">
        <Button variant="contained" color="warning" endIcon={<Mode />}>Edit</Button>
      </TableCell>
      <TableCell align="right">
        <Button variant="contained" color="error" endIcon={<Delete />}>Deletar</Button>
      </TableCell>
    </TableRow>
  ));

  return (
    <>
      <Container>
        <p>Olá, {user?.email}</p>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell colSpan={1}>Título</TableCell>
                <TableCell align="right" colSpan={1}>Publicado em</TableCell>
                <TableCell />
                <TableCell align="center" colSpan={3}>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {postList}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}

export default DashboardPage;