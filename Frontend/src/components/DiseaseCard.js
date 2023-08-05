import React from 'react'
import { Link } from 'react-router-dom'

import { Card } from 'react-bootstrap'




function DiseaseCard({ disease }) {
    return (
        <Card className="shadow-lg p-3 mb-5 bg-dark rounded-lg order-sm-1 mb-sm-0">
            <Link to={`/disease/${disease.crop.title}/${disease.title}`}>
                <div className="image-container">
                    <Card.Img className="shadow-sm mt-3 object-fit" src={disease.img} />
                </div>

                <Card.Body>
                    <Card.Title as="div">
                        <strong>{disease.title}</strong>
                    </Card.Title>

                    <Card.Text as="h3">
                        {disease.crop.title}
                    </Card.Text>
                </Card.Body>
            </Link>
        </Card>
    );
}


export default DiseaseCard