import React from 'react'

const Flat = (props) => {
   return (
      <div>
         <a href={props.link} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
            <div className="property-card card mx-auto">
               <div className="property-header">
                  <div className="property-rent bg-primary text-light">
                     <p>{props.status}</p>
                     <p className="font-weight-bold mb-1">₹ {props.rent}</p>
                  </div>
               </div>
               <img className="card-img-top" src={props.image} alt={props.title} />
               <div>
                  <div className="property-icons-wrapper">
                     <div className="property-icon-box">
                        <img src="/images/icons/bed-solid.svg" alt="bed" />
                        <span className="property-icon-text ml-2 text-light">{props.bedrooms}</span>
                     </div>
                     <div className="property-icon-box">
                        <img src="/images/icons/bath-solid.svg" alt="BathRoom" />
                        <span className="property-icon-text ml-2 text-light">{props.bathrooms}</span>
                     </div>
                     <div className="property-icon-box">
                        <img src="/images/icons/male-solid.svg" alt="Mates" />
                        <span className="property-icon-text ml-2 text-light">{props.mates}</span>
                     </div>
                     <div className="property-icon-box">
                        <img src="/images/icons/external-link-square-alt-solid.svg" alt="Area" />
                        <span className="property-icon-text ml-2 text-light" style={{ fontSize: '12px' }}>{props.area} sq.ft.</span>
                     </div>
                  </div>
               </div>
               <div className="card-body">
                  <p className="text-muted my-0 card-text" style={{ fontSize: '12px' }}>Posted on: {props.postedOn}</p>
                  <div className="text-left text-capitalize card-title h5" style={{ fontSize: '16px' }}>{props.title}</div>
                  <p className="d-flex align-items-center card-text"><i className="fa fa-map-marker text-small text-muted mr-2"></i><span className="text-small text-muted">{props.location}</span></p>
               </div>
            </div>
         </a>
      </div>

   )
}

export default Flat