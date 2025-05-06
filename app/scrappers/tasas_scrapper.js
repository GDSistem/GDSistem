const https = require('https');
const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://www.bcv.org.ve/';

const obtenerTasaDolar = async () => {
  try {
    const agent = new https.Agent({ rejectUnauthorized: false }); // 🔥 Ignora certificados inválidos

    const { data: html } = await axios.get(url, {
      httpsAgent: agent,
      headers: {
        'User-Agent': 'Mozilla/5.0'
      }
    });

    const $ = cheerio.load(html);
    const dolarText = $('#dolar .centrado').first().text().trim();
    const euroText = $('#euro .centrado').first().text().trim();

    console.log(`💵 Tasa del dólar (BCV): ${dolarText}`);
    console.log(`💶 Tasa del euro (BCV): ${euroText}`);
  } catch (error) {
    console.error('❌ Error al obtener la tasa del dólar:', error.message);
  }
};

obtenerTasaDolar();
