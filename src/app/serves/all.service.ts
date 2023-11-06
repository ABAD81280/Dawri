import { Injectable } from '@angular/core';
import { getFirestore, collection,query,where,getDoc,getDocs,setDoc, doc, addDoc,updateDoc,collectionGroup,deleteDoc,orderBy,or,and} from 'firebase/firestore';
import { initializeApp } from "firebase/app"
import {environment} from "../../environments/environment"
import { FirebaseApp } from '@angular/fire/app';
import {AngularFireAuth} from "@angular/fire/compat/auth"
import firebase from 'firebase/compat/app';
import { Router } from "@angular/router"

const add = initializeApp(environment.firebase)
@Injectable({
  providedIn: 'root'
})
export class AllService {
  
  constructor(private auth:AngularFireAuth,public router:Router) { }
  
  async addNewGroup(name:string)
  {
    if(name!=null)
    {
    const data ={
      name:name
    }
    const ref = collection(getFirestore(),"Group")
    const q = query(ref,where("name","==",name))
    const qsnp = await getDocs(q)
    if(qsnp.docs.length==0)
    {
      addDoc(ref,data).then(()=>{
        alert("تم اضافه الجلسه")
      })
      
    }
    else
    {
      alert("الجلسه موجوده بالفعل")
    }
  }
  else{
    alert("الرجاء تعبه الاسم")
  }
  }
  async addAccount(name:string,email:string,groupname:string,pas:string)
  {
    if(groupname == null && name == null && email == null && pas == null)
    {
      alert("الرجاء ادخال جميع البيانات")
    }
    else
    {
      const ref = collection(getFirestore(),"Group")
      const q = query(ref,where("name","==",groupname))
      const qsnp = await getDocs(q)
      if(qsnp.docs.length == 0)
      {
        alert("القروب غير موجود")
      }
      else
      {
        const data = {
          name:name,
          email:email,
          groupname:groupname,
          points:0
        }
        
        
        const ref1 = collection(getFirestore(),"user")
        this.auth.createUserWithEmailAndPassword(email,pas).then(()=>{
          addDoc(ref1,data).then(()=>{
            alert("تم اضافه الحساب")
            this.router.navigate(["/Login"])
          })
        }).catch((err)=>{
          alert(err)
        })
      }
    }
  }
  async Login(email:string,pas:string)
  {
    if(email == null && pas == null)
    {
      alert("الرجاء تعبه البيانات")
    }
    else
    {
    this.auth.signInWithEmailAndPassword(email,pas).then(async ()=>{
      const ref = collection(getFirestore(),"user")
      const q = query(ref,where("email","==",email))
      const qsnp = await getDocs(q)
      qsnp.forEach((docc)=>{
        sessionStorage.setItem("g",docc.get("groupname"))
        sessionStorage.setItem("e",docc.get("email"))
      })
      this.router.navigate(["/pointsList"])
    }).catch((err)=>{
      alert(err)
    })
    }
  }
  async getAll(g:string)
  {
    const all:any=[]
    const ref = collection(getFirestore(),"user")
    const q = query(ref,where("groupname","==",g),orderBy("points","desc"))
    const qsnp = await getDocs(q)
    qsnp.forEach((doc)=>{
      all.push(doc.data())
      
      console.log(all)
    })
    
    return all
  }
  async plusPoints(email:string,name:string)
  {
    const ref = collection(getFirestore(),"user")
    const q = query(ref,where("email","==",email))
    const qsnp = await getDocs(q)
    qsnp.forEach((docc)=>{
      const reff = doc(collection(getFirestore(),"user"),docc.id)
      const pp = docc.get("points")+3
      updateDoc(reff,{points:pp}).then(()=>{
        alert(" تم زياده 3 نقاط الى"+name)
        location.reload()
      })
    })
  }
  async minusPoints(email:string,name:string)
  {
    const ref = collection(getFirestore(),"user")
    const q = query(ref,where("email","==",email))
    const qsnp = await getDocs(q)
    qsnp.forEach((docc)=>{
      const reff = doc(collection(getFirestore(),"user"),docc.id)
      const pp = docc.get("points")-2
      updateDoc(reff,{points:pp}).then(()=>{
        alert(" تم خصم 2 نقاط الى"+name)
        location.reload()
      })
    })
  }
  async zeroPoints(g:string)
  {
    const data={points:0}
    const ref = collection(getFirestore(),"user")
    const q = query(ref,where("groupname","==",g))
    const qsnp = await getDocs(q)
    qsnp.forEach((docc)=>{
      const reff = doc(collection(getFirestore(),"user"),docc.id)
      updateDoc(reff,data).then(()=>{
        alert("تم تصفير النقاط")
        location.reload()
      })
    })
  }
  async updateGroupName(email:string,g:string)
  {
    const data ={
      groupname:g,
      points:0
    }
    const refu = collection(getFirestore(),"user")
    const refg = collection(getFirestore(),"Group")
    const qg = query(refg,where("name","==",g))
    const qsnpg = await getDocs(qg)
    if(qsnpg.docs.length ==0)
    {
      alert("المجموعه غير موجوده")
    }
    else
    {
      const qu = query(refu,where("email","==",email))
      const qsnpu = await getDocs(qu)
      qsnpu.forEach((docc)=>{
        const d = doc(collection(getFirestore(),"user"),docc.id)
        updateDoc(d,data).then(()=>{
          alert("تم تحديث المجموعه")
          sessionStorage.setItem("g",g)
          location.reload()
        })

      })
    }
  }

}
