import is from "@sindresorhus/is";
import {Router} from "express";
import {loginRequired} from "../middlewares/loginRequired";
// import {photoRouter} from '../services/photoService';
import multer from "multer";
const photoRouter = Router();
// 로그인 체크 여부 확인(postman 사용할 때는 있으면 로그인이 필요합니다 뜸)
photoRouter.use(loginRequired);

photoRouter.post('/upload',async(req,res)=>{
    try{
      if(!req.files){
        res.send({
          status: false,
          message:"파일 업로드 실패"
        });
      } else {
        let f = req.files.uploadFile;
        f.mv('./uploads/'+f.name);
        res.send({
          status: true,
          message: "파일 업로드 성공",
          data :{
            name: f.name,
            mimetype : f.mimetype,
            size: f.size
          }
        });
      }
    } catch (err) {
      res.status(500).send(err);
    }
  })



export {photoRouter};

