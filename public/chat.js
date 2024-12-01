const socket = io();
const enduser=document.getElementById("enduser")
const usercount=document.getElementById("usercount")
const message=document.getElementById("message")
const username=document.getElementById("username")
const messages=document.querySelector("messages")
const form=document.querySelector("form")
socket.on("newuser",(id)=>{
  enduser.textContent=id;
})
socket.on("chat message",()=>{

})

socket.on("usercount",(count)=>{
  usercount.textContent=count;
})

socket.on("chat message",(username,message)=>{
  const li = document.createElement("li")
  li.textContent=`${username}:${message}`
  messages.appendChild(li)
})
form.addEventListener("submit",(e)=>{
  e.preventDefault();
  socket.emit("chat message",username.value,message.value)
})
