import React, {useState, useEffect} from 'react';
import { Form, Button, Col, Row, Card} from 'react-bootstrap';
import CareerSkillAddEdit from "./CareerSkillAddEdit";
import * as Api from "../../api";
import CareerSkillCard from './CareerSkilCard';

const CareerSkills = ({portfolioOwnerId, isEditable}) => {
  
  const [isEditing, setIsEditing] = useState(false); // 편집버튼 
  const [checkData, setCheckData] = useState(false); // data 유무 확인 
  const [open, setOpen] = useState(false);
  const [skills, setSkill] = useState([]); // 백에서 가져옴
  
  useEffect(() => { 
    try{
      Api.get(`skillList` ,portfolioOwnerId).then((res) => 
      setSkill(res.data)   
      );
    } 
    catch(error){
      console.log(error);
      if (error.response) {
       const { data } = error.response;
       console.error("data : ", data);
     }
    }
  }, [portfolioOwnerId]);


  const onClick = () => {
    setOpen((prev)=> !prev);
    if(skills.length > 0){
      setCheckData(true);
    } 

  }

   return (
     <>
     <Card>
       <Card.Body>
       <Card.Title>🛠 경력 및 주요 기술</Card.Title>
        {skills.map((skill) => (
          <CareerSkillCard
            key={skill.id}
            skill={skill}
            setSkill={setSkill}
            isEditable={isEditable}
          />
        ))}
      { isEditable && (
         <Form.Group as={Row} className="mt-3 text-center">
         <Col sm={{ span: 20 }}>
         <Button 
            className='m-3'
            style={{
             border:"none",
             backgroundColor:"#CFD3FF",
             borderRadius:50}}
            onClick={onClick}
            >편집</Button>
             </Col>
          </Form.Group> 
            )}
            {open && (
            <CareerSkillAddEdit
             portfolioOwnerId = {portfolioOwnerId}
             key={skills.id}
             skills={skills}
             setSkill={setSkill}
             isEditable={isEditable}
             setIsEditing = {setIsEditing}
             checkData = {checkData}
             setOpen = {setOpen}
             />)}
         
       </Card.Body>
    </Card>  
    </>
     )
}

export default CareerSkills;


