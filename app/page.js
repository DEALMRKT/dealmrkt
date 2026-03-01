"use client";
import React, { useState, useEffect } from 'react';
import { Search, User, PlusCircle, Rocket, MessageSquare, Star, ShieldCheck, CreditCard, LayoutDashboard, Clock, XCircle, AlertTriangle, Scale, ShieldAlert, ChevronRight, CheckCircle2, Lock, Send, Info } from 'lucide-react';

export default function DealMrkt() {
  // --- НАСТРОЙКИ ПОЛЬЗОВАТЕЛЯ ---
  const [isAuth, setIsAuth] = useState(true); 
  const [userRole, setUserRole] = useState('owner'); // Поставь 'user' чтобы скрыть админку
  const [view, setView] = useState('main'); 
  const [balance, setBalance] = useState(10500.45);

  // --- СОСТОЯНИЯ ИНТЕРФЕЙСА ---
  const [showModal, setShowModal] = useState(false);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [inputPrice, setInputPrice] = useState("");

  // --- БАЗА ДАННЫХ (Эмуляция) ---
  const [items, setItems] = useState([
    { id: "LOT-992", title: "Аккаунт Brawl Stars (Все леги)", price: 4500, status: 'active', lastBoost: new Date(Date.now() - 20000000), seller: "TopGamer" },
    { id: "LOT-441", title: "1000 Робуксов (Курс 0.7)", price: 700, status: 'active', lastBoost: new Date(), seller: "RobloxShop" }
  ]);

  const [orders, setOrders] = useState([
    { 
      id: "DM-7701", 
      item: "Аккаунт Genshin Impact", 
      price: 3200, 
      buyer: "User_Kirill", 
      seller: "SellersPro", 
      status: 'dispute', 
      date: "01.03.2026",
      chatHistory: [
        { from: "buyer", text: "Я купил аккаунт, но пароль не подходит!" },
        { from: "seller", text: "Все данные верны, я проверял перед продажей." },
        { from: "buyer", text: "Нет, я записал видео входа. Прошу возврат!" }
      ]
    }
  ]);

  // --- ЛОГИКА ---
  const commission = 0.05;
  const getNetProfit = (p) => (p > 0 ? (p * (1 - commission)).toFixed(2) : "0.00");

  // Защита доступа к админке
  useEffect(() => {
    if (view === 'admin' && userRole !== 'owner') setView('main');
  }, [view, userRole]);

  return (
    <div className="min-h-screen bg-[#0b0e14] text-white font-sans selection:bg-blue-500/30">
      
      {/* НАВИГАЦИЯ */}
      <nav className="border-b border-gray-800 bg-[#0f121a]/95 backdrop-blur-2xl sticky top-0 z-50 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-4">
          <div onClick={() => setView('main')} className="text-3xl font-black tracking-tighter text-blue-500 cursor-pointer hover:scale-105 transition italic">
            DEAL<span className="text-white tracking-normal">MRKT</span>
          </div>
          
          <div className="flex items-center gap-6">
            {isAuth && (
              <div className="flex items-center gap-5">
                {/* КНОПКА ТОЛЬКО ДЛЯ ВЛАДЕЛЬЦА */}
                {userRole === 'owner' && (
                  <button 
                    onClick={() => setView('admin')} 
                    className="flex items-center gap-2 text-yellow-400 font-black text-[10px] uppercase border border-yellow-500/20 bg-yellow-500/5 px-4 py-2.5 rounded-xl hover:bg-yellow-500/10 transition animate-pulse shadow-[0_0_20px_rgba(234,179,8,0.1)]"
                  >
                    <ShieldAlert size={14}/> АРБИТРАЖ ВЛАДЕЛЬЦА
                  </button>
                )}

                <div onClick={() => setView('profile')} className="flex items-center gap-3 cursor-pointer group bg-[#161b22] p-1 pr-4 rounded-2xl border border-gray-800">
                  <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-black group-hover:rotate-6 transition shadow-lg shadow-blue-600/20">U</div>
                  <div className="text-right hidden sm:block">
                    <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest leading-none">Balance</p>
                    <p className="text-sm font-black text-green-400 leading-none mt-1">{balance.toFixed(2)} ₽</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-4 md:p-8">
        
        {view === 'main' && (
          <div className="animate-in fade-in duration-700">
            {/* БАННЕР DEALMRKT */}
            <div className="w-full h-80 rounded-[3.5rem] bg-[#12161f] mt-4 flex items-center justify-center relative overflow-hidden border border-white/5 shadow-2xl group">
               <img 
                 src="/banner.jpg" 
                 className="absolute inset-0 object-cover w-full h-full opacity-40 group-hover:scale-105 transition duration-1000" 
                 onError={(e) => { e.target.src = "https://images.unsplash.com"; }} 
               />
               <div className="absolute inset-0 bg-gradient-to-t from-[#0b0e14] via-transparent to-transparent z-10"></div>
               <div className="z-20 text-center px-6">
                  <h2 className="text-6xl md:text-8xl font-black italic text-white uppercase leading-none tracking-tighter">DEAL<span className="text-blue-500">MRKT</span></h2>
                  <p className="text-blue-400 font-black mt-4 tracking-[0.5em] uppercase text-[11px] italic">Safe digital trading system</p>
               </div>
            </div>

            {/* ЦЕНТРАЛЬНАЯ КНОПКА */}
            <div className="flex justify-center -mt-14 relative z-30">
              <button 
                onClick={() => setShowModal(true)} 
                className="bg-blue-600 hover:bg-blue-500 hover:scale-105 shadow-[0_25px_60px_rgba(37,99,235,0.4)] px-16 py-8 rounded-[2.8rem] flex items-center gap-4 font-black text-2xl transition-all border-b-[6px] border-blue-800 uppercase italic tracking-tighter"
              >
                <PlusCircle size={32} /> СОЗДАТЬ ОБЪЯВЛЕНИЕ
              </button>
            </div>

            {/* ТОВАРЫ */}
            <section className="mt-32 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
              {items.map(item => (
                <div key={item.id} className="bg-[#161b22] border border-gray-800 p-6 rounded-[3rem] hover:border-blue-500 transition-all cursor-pointer group shadow-2xl">
                  <div className="w-full h-44 bg-[#0b0e14] rounded-[2.2rem] mb-6 overflow-hidden border border-gray-800 relative shadow-inner">
                     <div className="w-full h-full bg-gradient-to-br from-blue-900/40 to-purple-900/40 group-hover:scale-110 transition duration-1000"></div>
                     <span className="absolute bottom-4 left-4 text-[9px] font-black uppercase text-blue-400 border border-blue-500/30 px-2 py-1 rounded-lg backdrop-blur-md italic">ID: {item.id}</span>
                  </div>
                  <h3 className="font-black text-xl mb-6 italic uppercase truncate px-2 leading-none">{item.title}</h3>
                  <div className="flex justify-between items-center border-t border-gray-800/50 pt-6 px-2">
                    <span className="text-2xl font-black text-green-400 tracking-tighter">{item.price} ₽</span>
                    <button className="bg-blue-600 px-6 py-3 rounded-2xl text-[10px] font-black uppercase hover:bg-blue-400 transition shadow-lg shadow-blue-600/20">КУПИТЬ</button>
                  </div>
                </div>
              ))}
            </section>
          </div>
        )}

        {/* --- ПАНЕЛЬ ВЛАДЕЛЬЦА (АРБИТРАЖ С ЧАТОМ) --- */}
        {view === 'admin' && userRole === 'owner' && (
          <div className="max-w-7xl mx-auto py-12 animate-in zoom-in-95 duration-500">
             <div className="bg-yellow-500/10 border border-yellow-500/30 p-12 rounded-[4rem] mb-12 flex items-center justify-between shadow-2xl relative">
                <div className="flex items-center gap-8 relative z-10">
                   <div className="bg-yellow-500 p-6 rounded-[2.2rem] shadow-[0_0_50px_rgba(234,179,8,0.4)]">
                      <Scale className="text-[#0b0e14]" size={48} />
                   </div>
                   <div>
                      <h2 className="text-5xl font-black italic uppercase leading-none tracking-tighter">АРБИТРАЖ ВЛАДЕЛЬЦА</h2>
                      <p className="text-yellow-500 text-xs font-black uppercase tracking-[0.5em] mt-3 italic">Total Control Mode: Active</p>
                   </div>
                </div>
                <button onClick={() => setView('main')} className="bg-white/5 hover:bg-white/10 px-10 py-5 rounded-3xl font-black text-xs uppercase border border-white/5 transition-all active:scale-95 tracking-widest">Закрыть панель</button>
             </div>
             
             <div className="grid grid-cols-1 lg:grid-cols-1 gap-12">
                <div className="bg-[#161b22] rounded-[4rem] border border-gray-800 p-12 shadow-2xl">
                   <h3 className="font-black text-3xl italic uppercase mb-12 flex items-center gap-4 text-red-500 tracking-tighter border-b border-gray-800 pb-8">
                     <ShieldAlert size={32}/> ТЕКУЩИЕ СПОРЫ (1)
                   </h3>
                   
                   <div className="grid grid-cols-1 gap-10">
                      {orders.filter(o => o.status === 'dispute').map(o => (
                        <div key={o.id} className="bg-[#0b0e14] p-10 rounded-[4rem] border border-red-500/20 group relative overflow-hidden">
                           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 border-b border-gray-800 pb-8">
                              <div>
                                <span className="font-black text-red-500 uppercase italic text-2xl tracking-tighter">ЗАКАЗ {o.id}</span>
                                <p className="text-xs text-gray-500 font-black uppercase mt-1">Лот: {o.item} | Покупатель: {o.buyer} | Продавец: {o.seller}</p>
                              </div>
                              <span className="text-4xl font-black text-green-400 tracking-tighter italic">{o.price} ₽</span>
                           </div>
                           
                           {/* СЕКРЕТНЫЙ ЧАТ ДЛЯ АДМИНА */}
                           <div className="mb-10">
                              <p className="text-[10px] font-black text-yellow-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <MessageSquare size={12}/> ИСТОРИЯ ПЕРЕПИСКИ (ВИДНО ТОЛЬКО ВАМ)
                              </p>
                              <div className="bg-[#161b22] p-8 rounded-[2.5rem] border border-gray-800 space-y-6 max-h-80 overflow-y-auto shadow-inner">
                                {o.chatHistory.map((msg, idx) => (
                                  <div key={idx} className={`flex flex-col ${msg.from === 'buyer' ? 'items-start' : 'items-end'}`}>
                                    <span className={`text-[10px] font-black uppercase mb-1 ${msg.from === 'buyer' ? 'text-blue-400' : 'text-purple-400'}`}>
                                      {msg.from === 'buyer' ? o.buyer : o.seller}
                                    </span>
                                    <div className={`p-4 rounded-2xl max-w-[80%] text-sm font-medium ${msg.from === 'buyer' ? 'bg-blue-600/10 border border-blue-500/20 rounded-tl-none' : 'bg-purple-600/10 border border-purple-500/20 rounded-tr-none'}`}>
                                      {msg.text}
                                    </div>
                                  </div>
                                ))}
                              </div>
                           </div>

                           {/* КНОПКИ РЕШЕНИЯ */}
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                              <button className="group relative bg-green-600 hover:bg-green-500 py-6 rounded-[2rem] text-xs font-black uppercase transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3">
                                <CheckCircle2 size={20}/> ВЫПЛАТИТЬ ПРОДАВЦУ
                                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition"></div>
                              </button>
                              <button className="group relative bg-red-600 hover:bg-red-500 py-6 rounded-[2rem] text-xs font-black uppercase transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3">
                                <XCircle size={20}/> ВЕРНУТЬ ПОКУПАТЕЛЮ
                                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition"></div>
                              </button>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
             </div>
          </div>
        )}

        {/* ПРОФИЛЬ */}
        {view === 'profile' && (
           <div className="max-w-5xl mx-auto py-20 text-center animate-in slide-in-from-bottom-10">
              <div className="w-40 h-40 bg-gradient-to-tr from-blue-600 to-indigo-700 rounded-[3.5rem] flex items-center justify-center text-7xl font-black mx-auto mb-10 shadow-2xl">D</div>
              <h2 className="text-5xl font-black italic uppercase mb-4 tracking-tighter">DEAL_USER_MASTER</h2>
              <p className="text-gray-500 font-black uppercase tracking-[0.5em] text-[10px] mb-16 italic">System Role: <span className={userRole === 'owner' ? "text-yellow-500" : "text-blue-500"}>{userRole}</span></p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-left">
                 <div className="bg-[#161b22] p-12 rounded-[4rem] border border-gray-800 shadow-2xl">
                    <h3 className="font-black text-2xl italic mb-8 uppercase flex items-center gap-3"><Clock size={24} className="text-blue-500"/> Мои лоты</h3>
                    <p className="text-gray-600 italic font-medium">Активных объявлений пока нет.</p>
                 </div>
                 <div className="bg-[#161b22] p-12 rounded-[4rem] border border-gray-800 shadow-2xl">
                    <h3 className="font-black text-2xl italic mb-8 uppercase text-red-500 flex items-center gap-3"><AlertTriangle size={24}/> Поддержка</h3>
                    <p className="text-xs text-gray-500 mb-8 font-bold uppercase tracking-widest leading-relaxed">Возникли проблемы? Создайте тикет, и Владелец проекта разберется в ситуации.</p>
                    <button onClick={() => setShowTicketModal(true)} className="w-full bg-red-600/10 text-red-500 py-6 rounded-[2rem] font-black uppercase text-xs border border-red-500/20 hover:bg-red-500/20 transition tracking-widest">СОЗДАТЬ ТИКЕТ</button>
                 </div>
              </div>
           </div>
        )}
      </div>

      {/* МОДАЛКА ВЫСТАВЛЕНИЯ ТОВАРА */}
      {showModal && (
        <div className="fixed inset-0 bg-black/98 backdrop-blur-3xl flex items-center justify-center p-4 z- animate-in fade-in duration-300">
          <div className="bg-[#161b22] w-full max-w-xl p-12 rounded-[4.5rem] border border-blue-500/20 shadow-2xl relative overflow-hidden text-center">
            <button onClick={() => setShowModal(false)} className="absolute top-10 right-10 text-gray-500 hover:text-white text-4xl transition duration-500 hover:rotate-90">×</button>
            <h2 className="text-5xl font-black tracking-tighter uppercase italic leading-none mb-12">НОВЫЙ ЛОТ</h2>
            <div className="space-y-8 text-left">
              <div className="space-y-3 px-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-2 italic">Название товара</label>
                <input placeholder="Напр: Аккаунт Steam 100 игр" className="w-full bg-[#0b0e14] border border-gray-800 p-6 rounded-[2rem] outline-none font-bold text-base focus:border-blue-500 transition shadow-inner" />
              </div>
              <div className="grid grid-cols-2 gap-8">
                 <div className="space-y-3 px-2">
                   <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-2 italic">Цена продажи</label>
                   <input type="number" placeholder="0" value={inputPrice} onChange={(e)=>setInputPrice(e.target.value)} className="w-full bg-[#0b0e14] border border-gray-800 p-6 rounded-[2rem] outline-none font-black text-2xl text-green-400 text-center shadow-inner focus:border-green-500 transition" />
                 </div>
                 <div className="bg-[#0b0e14] p-6 rounded-[2rem] flex flex-col justify-center text-center border border-blue-500/10 shadow-inner relative overflow-hidden">
                    <p className="text-[9px] text-gray-500 font-black uppercase mb-1 italic">Чистая прибыль</p>
                    <p className="text-3xl font-black text-blue-500 tracking-tighter leading-none">{getNetProfit(inputPrice)} ₽</p>
                    <p className="text-[8px] text-gray-700 font-black mt-2 uppercase">Fee: 5%</p>
                 </div>
              </div>
              <button className="w-full bg-blue-600 hover:bg-blue-500 py-8 rounded-[2.8rem] font-black text-2xl transition-all border-b-[8px] border-blue-800 uppercase italic tracking-tighter shadow-[0_20px_50px_rgba(37,99,235,0.3)] active:scale-95 active:border-b-0">ОПУБЛИКОВАТЬ НА DEALMRKT</button>
            </div>
          </div>
        </div>
      )}

      {/* МОДАЛКА ЖАЛОБЫ */}
      {showTicketModal && (
        <div className="fixed inset-0 bg-black/98 backdrop-blur-3xl flex items-center justify-center p-4 z- animate-in fade-in duration-300">
          <div className="bg-[#161b22] w-full max-w-lg p-12 rounded-[4rem] border border-red-500/20 shadow-2xl relative text-center">
            <button onClick={() => setShowTicketModal(false)} className="absolute top-10 right-10 text-gray-500 hover:text-white text-3xl">×</button>
            <div className="bg-red-600 p-6 rounded-[2.2rem] inline-block mb-8 shadow-2xl shadow-red-600/30 animate-bounce"><AlertTriangle className="text-white" size={48} /></div>
            <h2 className="text-4xl font-black italic uppercase mb-10 tracking-tighter leading-none">СОЗДАТЬ ЖАЛОБУ</h2>
            <div className="space-y-6 text-left">
              <textarea placeholder="Опишите ситуацию подробно, прикрепите номер заказа..." className="w-full bg-[#0b0e14] border border-gray-800 p-8 rounded-[2.5rem] outline-none h-48 font-medium text-sm shadow-inner resize-none focus:border-red-500 transition" />
              <button className="w-full bg-red-600 hover:bg-red-500 py-6 rounded-[2.2rem] font-black text-xl transition-all border-b-[6px] border-red-800 uppercase italic tracking-tighter active:scale-95 shadow-lg shadow-red-600/20">ОТПРАВИТЬ АРБИТРУ</button>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="mt-60 border-t border-gray-800/50 p-24 text-center bg-gradient-to-b from-transparent to-blue-600/5">
        <p className="text-9xl font-black text-blue-500/5 mb-12 italic tracking-tighter select-none uppercase leading-none">DEALMRKT</p>
        <div className="flex flex-wrap justify-center gap-12 text-[10px] font-black text-gray-700 uppercase tracking-[0.6em] mb-12 italic">
           <a href="#" className="hover:text-blue-500 transition tracking-tighter border-b border-transparent hover:border-blue-500">Legal Info</a>
           <a href="#" className="hover:text-blue-500 transition tracking-tighter border-b border-transparent hover:border-blue-500">System Status</a>
           <a href="#" className="hover:text-blue-500 transition tracking-tighter border-b border-transparent hover:border-blue-500">Partnership</a>
        </div>
        <p className="text-gray-800 text-[9px] font-black uppercase tracking-[0.5em] opacity-50">© 2026. THE ULTIMATE DIGITAL MARKETPLACE ARCHITECTURE.</p>
      </footer>

    </div>
  );
    }
