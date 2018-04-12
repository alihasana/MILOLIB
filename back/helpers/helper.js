var helper = {
  caseInsensitive: (word) => {
    return { $regex: new RegExp('^' + word + '$', 'i') }
  },

  // C'est de la merde cette RegEx
  regexEmail: new RegExp(/^[A-Z0-9.+]+@[A-Z0-9.+]+$/, 'i'),
  // ".+@.+" aussi c'est naze, il y a une erreur "Invalid regular expression" avec certains characters speciaux qui fait crasher l'app
  // regexEmail: new RegExp(/^.+@.+$/, 'i') 
  // regexEmail: new RegExp(/^[.+]@[.+]$/, 'i') 
  
  beforeSend: (data) => {
    data.__v = undefined
  },

  beforeSendUser: (data) => {
    helper.beforeSend(data)
    data.password = undefined
  },
  
}

export default helper