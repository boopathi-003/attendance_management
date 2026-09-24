import { Card, Col } from "react-bootstrap";

const StateCard = ({ title, value }) => (
    <Col xl={3} lg={3} md={6} sm={12}>
        <Card className="text-center shadow-sm">
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text style={{ fontSize: "24px", fontWeight: "bold" }}>
                    {value}
                </Card.Text>
            </Card.Body>
        </Card>
    </Col>
);
export default StateCard;