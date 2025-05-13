document.addEventListener('DOMContentLoaded', () => {
    const icon = document.querySelector('.feature-icon');
    const popup = document.querySelector('.feature-popup');
  
    icon.addEventListener('click', () => {
      popup.style.display = popup.style.display === 'block' ? 'none' : 'block';
    });
  
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.feature-wrapper')) {
        popup.style.display = 'none';
      }
    });
});
  