import React, { Component } from "react";
import {Form, Button, ListGroup, Row, Col} from "react-bootstrap";
import API from "../utils/API";

class Search extends Component {
  state = {
    books: [],
    keyWord: ""
  };
  
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSearch = event => {
    event.preventDefault();
    API.searchBooks(this.state.keyWord)
      .then(res => this.setState({books: res.data, searchClicked: true}))
      .catch(err => console.log(err));
  };

  handleSave = (book) => {
    API.saveBook(book)
    .then(res => {
      if (res.data === 11000) {
        alert("Already Saved!")
      }
      else {
        this.setState({books: this.state.books.filter(item => item.id !== book.id)})
      } 
    })
    .catch(
    err => console.log(err));
  } 

  render () {
      return (
      <div>
        <Form>
          <Form.Group controlId="fromSearch">
            <Form.Label>Book Search</Form.Label>
            <Form.Control type="text" placeholder="Harry Potter" name="keyWord" onChange={this.handleInputChange}/>
          </Form.Group>
          <Button variant="dark" type="search" onClick={this.handleSearch}>
            Search
          </Button>
        </Form>
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
                    <Button variant="info" type="save" size="sm" onClick={() => this.handleSave(book)}>
                      Save
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
  
  export default Search;
  