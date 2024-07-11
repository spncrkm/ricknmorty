import React from "react";
import { useQuery } from "@apollo/client";
import { GET_CHARACTER } from "../queries/Queries";
import { useParams, Link } from "react-router-dom";
import {
  Alert,
  Container,
  Spinner,
  Row,
  Col,
  Card,
  Button,
} from "react-bootstrap";

interface EpisodeProps {
  name: string;
  episode: string;
}

const CharacterPage = () => {
  // useParams gives us access to url parameters in the route path
  // checks the route for the parameter :id
  const { id } = useParams();
  const { data, error, loading } = useQuery(GET_CHARACTER, {
    variables: { id }, // pass id from useParams into query
  });

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

  // if we don't get an error, then at this point in the code, we know we have valid data
  const { name, image, episode } = data.character;

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
      </Card.Body>
      <h2>Featured Episodes: </h2>
      {episode.map(({ name, episode }: EpisodeProps) => (
        <p>
          {name} - {episode}
        </p>
      ))}
    </Card>
  );
};

export default CharacterPage;
