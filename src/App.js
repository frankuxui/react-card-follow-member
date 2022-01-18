import React, { useEffect, useState } from "react";
// Bootstrap
import { Container, Col, Card } from "react-bootstrap";
// Masonry layout
import Masonry from 'react-masonry-component';
// Footer
import Footer from './template/Footer';
// Styles
import "./sass/style.scss";
// Loader
import Loader from './components/Loader';
import Media from "./components/Media";
import Avatar from "./components/Avatar";
import FetchError from "./components/FetchError";

const App = (props) => {

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setHasError(false);
      try {
        const res = await fetch(
          'https://random-data-api.com/api/users/random_user/?size=30',
        );
        const json = await res.json();
        setData(json);
      } catch (error) {
        setHasError(true);
      }
      setIsLoading(false);
    };
    fetchData();
    
  }, [setData]);

  //
  // Card animations

  useEffect(() => {
    const speed = 900;
    const containerAnimation = document.querySelectorAll('.js-animation')
    containerAnimation.forEach(() => {
      var elements = document.querySelectorAll('.js-animation .js-delay')
      elements.forEach(el => {
        var elementOffset = el;
        var offset = elementOffset.getBoundingClientRect().left * 0.5 + elementOffset.getBoundingClientRect().top;
        var delay = parseFloat(offset/speed).toFixed(2);
        elementOffset.style.transitionDelay = delay+ 's'
        elementOffset.classList.add('animated')
        //console.log(delay + ' delay item');
      });
    });
  })
  
  
  return (

    <div className="App">
      <Container>
        { hasError && <FetchError simbol="☹" error="Something went wrong."/> }
        { isLoading ?  ( <Loader/> ) : ( 
        <Masonry className="row js-animation">
          { data.map((user, index) => (
            <Col sm={6} md={4} lg={2} key={index} >
              <Card className="js-animation js-delay">
                <div className="card-content card-focus">
                  <Card.Body>
                    <Media 
                      name={ user.first_name } 
                      job={ user.employment.key_skill }
                      state={ user.address.state }
                      country={user.address.country }>
                      <Avatar size="90" avatar={ user.avatar }></Avatar>
                    </Media>
                  </Card.Body>
                  <Card.Footer className="p-0">
                    <div className="card-footer-action">
                      <a href="/#" className="sswp">
                        Follow
                      </a>
                    </div>
                  </Card.Footer>
                </div>
              </Card>  
            </Col>
          ))}
        </Masonry>)}
      </Container>

      <Footer/>
        
    </div>
    
  );
};

export default App;
