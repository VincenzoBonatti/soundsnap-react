'use client';
import React, { useEffect } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import {access } from '../Access';


function FeedPagina() {
  useEffect(() => {
    async function fetchToken() {
      let token = await access();
      console.log("Token no FeedPagina: " + token);
    }
    fetchToken();
  }, []);
 
  return (
    <main>
      
    </main>
  );
}

export default FeedPagina;