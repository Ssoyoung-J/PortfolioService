import React, {useState} from 'react';
import { Form, Button, Col, Row} from 'react-bootstrap';
import * as Api from "../../api";

const ProjectEdictForm = ({ editItem, setEditData, setIsEditing,}) => {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());

  console.log("아이디...",editItem.userId);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const id = editItem.userId;
    const userId = editItem.userId;
    const from_date = fromDate;
    const to_date = toDate;

  
    await Api.put(`projects/${id}`, {
      id,
      title,
      content,
      from_date,
      to_date
    });

    const res = await Api.get(`projectlist/${id}`);
    setEditData(res.data);
    setIsEditing(false);
  };

  
  return (
    <Form onSubmit={handleSubmit}  className="d-grid gap-2">
       <Form.Group as={Row} className="mt-3">
       <Form.Control
           className="p-2 bg-light border mb-2"
           type="text"
           onChange={(e) => setTitle(e.target.value)}
           name="projectTitle"
           value={title}
           placeholder="프로젝트 제목"/>

        <Form.Control
           className="p-2 bg-light border mb-2" 
           type="text"
           name="content"
           value={content} 
           onChange={(e) => setContent(e.target.value)}
           placeholder="상세내역" /> 

         <Form.Control
         className="mr-3"
         style={{width: 200}}
         type="date"
         placeholder="시작날짜"
         value={fromDate}
         onChange={(e) => setFromDate(e.target.value)}
       />
         <Form.Control
         className='mr-3'
         style={{width: 200}}
         type="date"
         placeholder="종료날짜"
         value={toDate}
         onChange={(e) => setToDate(e.target.value)}
       />
     </Form.Group>

      <Form.Group as={Row} className="mt-3 text-center">
       <Col sm={{ span: 20}}>
       <Button
        mb="10"
        style={{
         border:"none",
         backgroundColor:"#339AF0"
       }} 
       variant="primary" 
       type="submit" 
       className="me-3">
        확인
       </Button>
       <Button
        mb="10"
        style={{
         border:"none",
         backgroundColor:"#C4C4C4"
       }} 
       variant="secondary" 
       onClick={() => setIsEditing(false)}
       >
        취소
       </Button>
       </Col>
     </Form.Group>
     </Form>

 )}


export default ProjectEdictForm;