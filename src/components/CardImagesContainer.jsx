import { useEffect, useRef } from "react"

export default function (props){

  return (
    <div className="card-images-side">
      <div 
        className="images-container-3d" 
        id="images-container-3d" 
        style={{}}
      >
        {
          props.card.cardAditionalImages.map((item, index) => {
            return (
              <div 
                className="card-image"
                style={{
                  border: '1px solid green',
                  animation: `moveImage ${10 + index * 3}s linear infinite`
                }}
              >
                <img 
                  src={item} 
                  alt="" 
                  style={{transform: `translateZ(${index * 10 + 100}px)`}}
                />
              </div>
              
            )
          })
        }
          
      </div>
    </div>
  )
}