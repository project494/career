document.querySelectorAll('.dropdown > button').forEach(function (btn) {
  btn.addEventListener('click', function (e) {
    e.stopPropagation();
    const dropdown = btn.parentElement;
    const isOpen = dropdown.classList.contains('open');
    document.querySelectorAll('.dropdown.open').forEach(function (d) {
      d.classList.remove('open');
    });
    if (!isOpen) dropdown.classList.add('open');
  });
});

document.addEventListener('click', function () {
  document.querySelectorAll('.dropdown.open').forEach(function (d) {
    d.classList.remove('open');
  });
});
