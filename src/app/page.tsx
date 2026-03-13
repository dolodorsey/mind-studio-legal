"use client";
import { useState, useEffect, useRef } from "react";

function useInView(ref,t=0.12){const[v,setV]=useState(false);useEffect(()=>{if(!ref.current)return;const o=new IntersectionObserver(([e])=>{if(e.isIntersecting)setV(true)},{threshold:t});o.observe(ref.current);return()=>o.disconnect()},[ref,t]);return v}
function R({children,d=0}){const r=useRef(null);const v=useInView(r);return<div ref={r} style={{opacity:v?1:0,transform:v?"translateY(0)":"translateY(40px)",transition:`all 0.9s cubic-bezier(0.16,1,0.3,1) ${d}s`}}>{children}</div>}

const P={bg:"#F8F7FC",card:"#FFFFFF",violet:"#7C3AED",violetLight:"#F5F3FF",violetMid:"#A78BFA",sage:"#059669",sageLight:"#ECFDF5",warm:"#D97706",warmLight:"#FFFBEB",rose:"#E11D48",roseLight:"#FFF1F2",navy:"#1E1B4B",sky:"#0EA5E9",skyLight:"#F0F9FF",text:"#1E1B4B",textMid:"#64748B",textLight:"#94A3B8",shadow:"0 2px 16px rgba(124,58,237,0.05)",shadowLg:"0 8px 32px rgba(124,58,237,0.08)"};

export default function MindStudio(){
  const[tab,setTab]=useState("home");const[ready,setReady]=useState(false);
  useEffect(()=>{setTimeout(()=>setReady(true),150)},[]);

  const checkIn=[{label:"Mood",value:7,max:10,color:P.violet},{label:"Sleep",value:6,max:10,color:P.sage},{label:"Energy",value:5,max:10,color:P.warm},{label:"Calm",value:7,max:10,color:P.sky}];

  return(
    <div style={{background:P.bg,color:P.text,minHeight:"100vh",fontFamily:"'DM Sans', sans-serif"}}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Cormorant+Garamond:wght@400;500;600;700&display=swap" rel="stylesheet"/>

      <nav style={{position:"sticky",top:0,zIndex:100,padding:"14px 20px",display:"flex",alignItems:"center",justifyContent:"space-between",backdropFilter:"blur(20px)",background:"rgba(248,247,252,0.88)",borderBottom:"1px solid rgba(124,58,237,0.06)"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:36,height:36,borderRadius:12,background:"linear-gradient(135deg,#7C3AED,#A78BFA)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,boxShadow:"0 4px 12px rgba(124,58,237,0.3)"}}>🧠</div>
          <span style={{fontSize:14,fontWeight:800,color:P.navy}}>MIND STUDIO</span>
        </div>
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          <div style={{padding:"5px 10px",borderRadius:8,background:P.sageLight,fontSize:9,fontWeight:800,color:P.sage}}>🔒 SECURE</div>
          <div style={{width:36,height:36,borderRadius:"50%",background:P.violetLight,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:800,color:P.violet}}>DD</div>
        </div>
      </nav>

      <div style={{maxWidth:480,margin:"0 auto",padding:"0 20px 120px"}}>

        {/* HERO */}
        <div style={{paddingTop:24,opacity:ready?1:0,transform:ready?"translateY(0)":"translateY(30px)",transition:"all 1s cubic-bezier(0.16,1,0.3,1)"}}>
          <div style={{padding:"28px 24px",borderRadius:28,background:"linear-gradient(135deg,#7C3AED,#8B5CF6,#A78BFA)",color:"#fff",position:"relative",overflow:"hidden",boxShadow:"0 12px 40px rgba(124,58,237,0.25)",marginBottom:24}}>
            <div style={{position:"absolute",top:-40,right:-40,width:140,height:140,borderRadius:"50%",background:"rgba(255,255,255,0.1)"}}/>
            <div style={{fontSize:10,fontWeight:700,letterSpacing:"0.16em",opacity:0.85,marginBottom:10}}>YOUR SECURE SPACE</div>
            <h1 style={{fontFamily:"'Cormorant Garamond', serif",fontSize:"clamp(28px,7.5vw,42px)",fontWeight:600,lineHeight:1.1,marginBottom:10}}>Document. Organize.<br/>Heal.</h1>
            <p style={{fontSize:13,lineHeight:1.5,opacity:0.85,maxWidth:280,marginBottom:18}}>Track wellness, organize records, connect with providers securely.</p>
            <div style={{display:"flex",gap:10}}>
              <div style={{padding:"10px 18px",borderRadius:14,background:"#fff",color:P.violet,fontSize:12,fontWeight:800,cursor:"pointer"}}>Start Check-In</div>
              <div style={{padding:"10px 18px",borderRadius:14,background:"rgba(255,255,255,0.2)",fontSize:12,fontWeight:700,cursor:"pointer"}}>Open Journal</div>
            </div>
          </div>
        </div>

        {/* CHECK-IN */}
        <R>
          <div style={{borderRadius:24,background:"#fff",border:"1px solid rgba(124,58,237,0.06)",padding:22,boxShadow:P.shadow,marginBottom:28}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
              <div><div style={{fontSize:10,fontWeight:700,color:P.violet,letterSpacing:"0.1em"}}>DAILY CHECK-IN</div><div style={{fontSize:14,fontWeight:700,color:P.navy,marginTop:4}}>How are you today?</div></div>
              <div style={{fontSize:9,color:P.textLight}}>Mar 13, 2026</div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:18}}>
              {checkIn.map(m=>(
                <div key={m.label} style={{textAlign:"center"}}>
                  <div style={{width:52,height:52,borderRadius:"50%",margin:"0 auto 6px",position:"relative",background:`conic-gradient(${m.color} ${m.value*36}deg, ${m.color}15 0deg)`,display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <div style={{width:38,height:38,borderRadius:"50%",background:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,fontWeight:800,color:m.color}}>{m.value}</div>
                  </div>
                  <div style={{fontSize:9,color:P.textLight}}>{m.label}</div>
                </div>
              ))}
            </div>
            <div style={{padding:"12px 0",borderRadius:14,background:"linear-gradient(135deg,#7C3AED,#A78BFA)",textAlign:"center",fontSize:12,fontWeight:800,color:"#fff",cursor:"pointer",boxShadow:"0 4px 12px rgba(124,58,237,0.25)"}}>START CHECK-IN</div>
          </div>
        </R>

        {/* QUICK ACTIONS */}
        <R>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:28}}>
            {[{icon:"📝",title:"Journal",desc:"Private entries",color:P.violet,bg:P.violetLight},{icon:"📁",title:"Records Vault",desc:"Secure documents",color:P.sage,bg:P.sageLight},{icon:"📋",title:"Care Plan",desc:"Treatment goals",color:P.sky,bg:P.skyLight},{icon:"⚖️",title:"Legal Intake",desc:"Start review",color:P.warm,bg:P.warmLight}].map(a=>(
              <div key={a.title} style={{borderRadius:18,background:"#fff",border:"1px solid rgba(124,58,237,0.05)",padding:18,cursor:"pointer",boxShadow:P.shadow,position:"relative",overflow:"hidden"}}>
                <div style={{position:"absolute",top:0,left:0,width:4,height:"100%",background:a.color,borderRadius:"0 4px 4px 0"}}/>
                <div style={{width:40,height:40,borderRadius:12,background:a.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,marginBottom:10}}>{a.icon}</div>
                <div style={{fontSize:13,fontWeight:700,color:P.navy,marginBottom:2}}>{a.title}</div>
                <div style={{fontSize:10,color:P.textLight}}>{a.desc}</div>
              </div>
            ))}
          </div>
        </R>

        {/* TIMELINE */}
        <R>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:14}}>
            <h2 style={{fontFamily:"'Cormorant Garamond', serif",fontSize:22,fontWeight:600,color:P.navy}}>Timeline</h2>
            <span style={{fontSize:10,fontWeight:700,color:P.violet,cursor:"pointer"}}>VIEW ALL →</span>
          </div>
          <div style={{borderRadius:22,background:"#fff",border:"1px solid rgba(124,58,237,0.05)",padding:20,boxShadow:P.shadow,marginBottom:28,position:"relative"}}>
            <div style={{position:"absolute",left:30,top:20,bottom:20,width:2,background:P.violetLight}}/>
            {[{date:"Mar 10",title:"Appointment with Dr. Williams",type:"care"},{date:"Mar 5",title:"Incident documented — workplace",type:"incident"},{date:"Feb 28",title:"Updated care plan goals",type:"care"}].map((ev,i)=>(
              <div key={i} style={{display:"flex",gap:16,padding:"12px 0",position:"relative"}}>
                <div style={{width:20,height:20,borderRadius:"50%",background:ev.type==="incident"?P.roseLight:P.violetLight,border:`2px solid ${ev.type==="incident"?P.rose:P.violet}40`,flexShrink:0,marginTop:2,zIndex:1}}/>
                <div>
                  <div style={{fontSize:9,color:P.textLight,marginBottom:3}}>{ev.date}</div>
                  <div style={{fontSize:13,fontWeight:600,color:P.navy}}>{ev.title}</div>
                  {ev.type==="incident"&&<span style={{display:"inline-block",marginTop:4,padding:"2px 8px",borderRadius:6,background:P.roseLight,color:P.rose,fontSize:9,fontWeight:700}}>Linked to legal review</span>}
                </div>
              </div>
            ))}
          </div>
        </R>

        {/* MESSAGES */}
        <R>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
            <h2 style={{fontFamily:"'Cormorant Garamond', serif",fontSize:22,fontWeight:600,color:P.navy}}>Secure Messages</h2>
            <div style={{width:22,height:22,borderRadius:"50%",background:P.violet,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:800,color:"#fff"}}>2</div>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:28}}>
            {[{from:"Dr. Williams",preview:"Your updated care plan is ready",time:"1h ago",unread:true},{from:"Legal Team",preview:"Document request — 2 items remaining",time:"3h ago",unread:true},{from:"Support",preview:"Records securely backed up",time:"1d ago",unread:false}].map((m,i)=>(
              <div key={i} style={{borderRadius:18,background:"#fff",border:`1px solid ${m.unread?"rgba(124,58,237,0.12)":"rgba(124,58,237,0.05)"}`,padding:16,display:"flex",gap:12,boxShadow:P.shadow,cursor:"pointer"}}>
                <div style={{width:40,height:40,borderRadius:12,background:P.violetLight,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:800,color:P.violet,flexShrink:0}}>{m.from.split(" ").map(w=>w[0]).join("")}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
                    <span style={{fontSize:13,fontWeight:700,color:P.navy}}>{m.from}</span>
                    <span style={{fontSize:9,color:P.textLight}}>{m.time}</span>
                  </div>
                  <div style={{fontSize:11,color:P.textMid,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{m.preview}</div>
                </div>
                {m.unread&&<div style={{width:8,height:8,borderRadius:"50%",background:P.violet,flexShrink:0,marginTop:6}}/>}
              </div>
            ))}
          </div>
        </R>

        {/* RESOURCES */}
        <R>
          <div style={{borderRadius:24,background:"linear-gradient(135deg,#1E1B4B,#312E81)",padding:28,color:"#fff",boxShadow:P.shadowLg,position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",top:-20,right:-20,width:100,height:100,borderRadius:"50%",background:"rgba(167,139,250,0.15)"}}/>
            <div style={{fontSize:10,fontWeight:700,letterSpacing:"0.12em",color:"#A78BFA",marginBottom:10}}>RESOURCES</div>
            <div style={{fontFamily:"'Cormorant Garamond', serif",fontSize:22,fontWeight:600,marginBottom:16}}>Support when you need it</div>
            {["Understanding your care plan","How to prepare for legal intake","Guided breathing exercises"].map((r,i)=>(
              <div key={i} style={{padding:"12px 14px",borderRadius:14,background:"rgba(255,255,255,0.08)",marginBottom:i<2?8:0,fontSize:12,fontWeight:600,display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer"}}>
                {r}<span style={{opacity:0.4}}>→</span>
              </div>
            ))}
          </div>
        </R>
      </div>

      <div style={{position:"fixed",bottom:0,left:0,right:0,zIndex:100,backdropFilter:"blur(24px)",background:"rgba(255,255,255,0.92)",borderTop:"1px solid rgba(124,58,237,0.06)",padding:"8px 0 env(safe-area-inset-bottom, 8px)"}}>
        <div style={{maxWidth:480,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(5,1fr)",textAlign:"center"}}>
          {[{icon:"🏠",label:"Home",key:"home"},{icon:"📝",label:"Journal",key:"journal"},{icon:"📁",label:"Vault",key:"vault"},{icon:"💬",label:"Messages",key:"messages"},{icon:"👤",label:"Profile",key:"profile"}].map(t=>(
            <div key={t.key} onClick={()=>setTab(t.key)} style={{cursor:"pointer",padding:"6px 0"}}>
              <div style={{fontSize:20,marginBottom:1,opacity:tab===t.key?1:0.4,transform:tab===t.key?"scale(1.15)":"scale(1)",transition:"all 0.3s cubic-bezier(0.16,1,0.3,1)"}}>{t.icon}</div>
              <div style={{fontSize:9,fontWeight:700,color:tab===t.key?P.violet:P.textLight}}>{t.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
