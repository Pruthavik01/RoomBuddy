(() => {
  'use strict'

  const forms = document.querySelectorAll('.needs-validation')

  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      let isValid = form.checkValidity()

      // Extra check: ensure country is in the datalist
      const countryInput = form.querySelector('input[list="countryList"]')
      if (countryInput) {
        const datalist = document.getElementById('countryList')
        const options = Array.from(datalist.options).map(o => o.value)
        if (!options.includes(countryInput.value)) {
          isValid = false
          countryInput.setCustomValidity("Invalid country")
        } else {
          countryInput.setCustomValidity("")
        }
      }

      if (!isValid) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()

