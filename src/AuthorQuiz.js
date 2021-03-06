import React from 'react';
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import './App.css';
import './bootstrap.min.css';

function Book({title, onClick}) {
  return (
    <div className="answer" onClick={()=> {onClick(title);}}>
      <h4>{title}</h4>
    </div>
  );
}
function Hero(props) {
  return (
    <header className="row">
      <div className="jumbotron col-10 offset-1">
        <h1>
          The Author Quiz
        </h1>
        <p>
          Select the book written by the author shown
        </p>
      </div>
    </header>
  );
}
function Turn({author, books, highlight, onAnswerSelected}) {
  function highlightToBgColor(highlight) {
    const mapping = {
      'none': '',
      'correct': 'green',
      'wrong': 'red'
    };
    return mapping[highlight];
  }
  return (
    <div className="row turn" style={{backgroundColor: highlightToBgColor(highlight)}}>
      <div className="col-4 offset-1">
        <img src={author.imageUrl} className="authorimage" alt={author.imageUrl}/>
      </div>
      <div className="col-6">
        {books.map((title => <Book title={title} key={title} onClick={onAnswerSelected}/>))}
      </div>
    </div>
  );
}

Turn.prototype = {
  author: PropTypes.shape(
    {
      name : PropTypes.string.isRequired,
      imageUrl : PropTypes.string.isRequired,
      imageSource : PropTypes.string.isRequired,
      books : PropTypes.arrayOf(PropTypes.string).isRequired,
    }
  ),
  books : PropTypes.arrayOf(PropTypes.string).isRequired,
  highlight: PropTypes.string.isRequired,
  onAnswerSelected: PropTypes.func.isRequired

}

function Continue({show, onContinue}) {
  return (
    <div className="row continue">
      {show 
        ?   <div className="row continue">
              <button>Next</button>
            </div>
        : null }
    </div>
  );
}
function Footer(props) {
  return (
    <footer id="footer" className="row">
      <div className="col-12">
        <p className="text-muted credit">
          All images are from <a href="https://commons.wikimedia.org/wiki/Main_Page">Wikemedia Commons</a> and are in the public domain
        </p>
      </div>
    </footer>
  );
}

function AuthorQuiz({turnData, highlight, onAnswerSelected, onContinue}) {
  return (
    <div className="container-fluid">
      <Hero />
      <Turn {...turnData} highlight={highlight} onAnswerSelected={onAnswerSelected} />
      <Continue show={highlight === 'correct'} onContinue={onContinue} />
      <p><Link to="/add">Add an Author</Link></p>
      <Footer />
    </div>
  );
}

export default AuthorQuiz;
