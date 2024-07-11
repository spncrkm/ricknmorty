import { useQuery } from "@apollo/client";
import { GET_CHARACTERS } from "../queries/Queries";
import {
  Alert,
  Container,
  Spinner,
  Row,
  Col,
  Card,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";

interface CharacterProps {
  id: string;
  name: string;
  image: string;
}

const CharactersPage: React.FC = () => {
  const { data, loading, error } = useQuery(GET_CHARACTERS);

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return (
      <Alert variant="danger" dismissible>
        <Alert.Heading>Aw jeez! You got an error!</Alert.Heading>
        <p>{error.message}</p>
      </Alert>
    );
  }

  return (
    <Container>
      <h1>Character List</h1>
      <Row>
        {
          //aligns with query structure in documentation
          data.characters.results.map(({ id, name, image }: CharacterProps) => (
            <Col>
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src={image} />
                <Card.Body>
                  <Card.Title>{name}</Card.Title>
                  {/* utilizes id to go to the correct character page */}
                  <Link to={`/${id}`}>
                    <Button variant="primary">Go to Character Page</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))
        }
      </Row>
    </Container>
  );
};

export default CharactersPage;
