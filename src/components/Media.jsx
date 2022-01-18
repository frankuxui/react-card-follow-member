import React from "react";

const Media = ({ children, name, job, state, country }) => {
  return(
    <div className="card-media">
      {children}
      <div className="media-body">
        <h5 className="mb-1">
          <a className="card-media-link" href="/#">{ name }</a>
        </h5>
        <div className="--card-subtitle">{ job }</div>
        {
          country 
            ? ( <div className="text-muted --card-subtitle">{ state && `${state},` } {country}</div> )
            : '' 
        }
      </div>
    </div>
  );
};

export default Media;