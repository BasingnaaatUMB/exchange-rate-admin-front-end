import React from 'react'
import Carousel from 'react-bootstrap/Carousel'


function BCarousel() {
  return (
    <div>  
        <div className='container-fluid' >  
            <Carousel>  
                <Carousel.Item style={{'height':"300px"}} >  
                    <img style={{'height':"300px"}}  
                        className="d-block w-100"  
                        src={'slideshow_imgs/image2.jpg'}  alt=""/>    
                </Carousel.Item  >  

                <Carousel.Item style={{'height':"300px"}}>  
                    <img style={{'height':"300px"}}  
                        className="d-block w-100"  
                        src={'slideshow_imgs/image1.jpg'}   alt=""/>  
                </Carousel.Item>

                <Carousel.Item style={{'height':"300px"}}>  
                    <img style={{'height':"300px"}}  
                        className="d-block w-100"  
                        src={'slideshow_imgs/image3.jpg'}   alt=""/>   
                </Carousel.Item>  
            </Carousel>  
        </div>  
    </div>  
  )
}

export default BCarousel