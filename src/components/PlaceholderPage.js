import React from 'react';

function PlaceholderPage({ headline = "Lorem ipsum dolor sit amet, consectetur adipiscing elit." }) {

    const content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    return (
        <div>
            <h1>{headline}</h1>
            <p>{content}</p>
        </div>
    );
}

export default PlaceholderPage;
