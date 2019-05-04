import React, { Component } from "react";
import API from "../utils/API";
import {Button, ListGroup, Row, Col} from "react-bootstrap";

class Saved extends Component {
  state = {
    books: []
  };

  componentDidMount() {
    this.loadBooks();
  };

  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({ books: res.data})
      )
      .catch(err => console.log(err));
  };

  handleDelete = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  render() {
      return (
          <div>
              {this.state.books.length ? (
            <ListGroup className="mt-4">
              {this.state.books.map(book => (
                <ListGroup.Item key={book.id} className="mb-4">
                  <Row>
                    <Col xs={12} md={8} lg={10}>
                      <h2>{book.title}</h2>
                      <hr />
                      <h4>{book.authors}</h4>
                    </Col>
                    <Col xs={12} md={4} lg={2}>
                      <Button variant="info" type="view" size="sm" className="mr-3" href={book.link}>
                        View
                      </Button>
                      <Button variant="info" type="save" size="sm" onClick={() => this.handleDelete(book._id)}>
                        Delete
                      </Button>
                    </Col>
                  </Row>
                  <hr />
                  <Row>
                    <Col xs={12} sm={4} md={3} lg={2}>
                      <img src={book.image} alt=""></img>
                    </Col>
                    <Col xs={12} sm={8} md={9} lg={10}>
                      {book.description}
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
            ) : null}
          </div>
      );
    }
  }
  
  export default Saved;
  