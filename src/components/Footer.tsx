import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Footer() {
  return (
    <Card className='mb-4'>
      <Card.Header>Nguyễn Văn Đức</Card.Header>
      <Card.Body>
        <Card.Title>Special title treatment</Card.Title>
        <Card.Text>
         Địa chỉ : Kí túc xá Mỹ Đình ,Nam Từ Liêm
        </Card.Text>
        <Button variant="primary">Bản đồ</Button>
      </Card.Body>
    </Card>
  );
}

export default Footer;