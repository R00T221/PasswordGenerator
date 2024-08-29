/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*"],
  theme: {
    /* in extend we here used the self-defined/external color and fonts */
    extend: {
       colors:{
        'dk-violet': 'hsl(268, 75%, 9%)',
        'lt-violet': 'hsl(268, 47%, 21%)',
        'lt-violet2': 'hsl(281, 89%, 26%)',
        'vb-violet': 'hsl(285, 91%, 52%)',
        'vb-violet2': 'hsl(290, 70%, 36%)',
        'vb-yellow': 'hsl(52, 100%, 62%)',
        'pl-white': 'hsl(0, 0%, 100%)',
        'vb-cyan': 'hsl(176, 100%, 44%)',
        'vb-cyan2': 'hsl(177, 92%, 70%)',
        'dk-text': 'hsl(198, 20%, 13%)',
       },
       borderWidth: {
        '0.35': '0.25rem',
       },
      fontFamily: {
      spartan: ['League Spartan' , 'sans-serif'],
      customo: [
        
      ],
    },
    transitionProperty:{
      'scale':'transform,scale',
    },

    backgroundImage:{
      gradiento:'linear-gradient(231deg, rgba(22, 6, 40, 1) 0%, rgba(52, 28, 79, 1) 50%, rgba(88, 7, 125, 1) 100%)',
//Since we cant use var colors of css in tailwind,so we use actual values here.Thus instaed of writing linear-gradient('vb-violet,vb-violet),we write their values here which are defined above in 'colors'.
      'slider-gradient':'linear-gradient(hsl(285, 91%, 52%),hsl(285, 91%, 52%))',
    },

  
  }, //extend ends
  },
  plugins: [],
}
