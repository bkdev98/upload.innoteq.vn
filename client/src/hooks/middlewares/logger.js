export default fn => (set, get) => fn(args => {
  console.log("→ APPLYING\n", args)
  set(args)
  console.log("→ NEW STATE\n", get())
}, get);