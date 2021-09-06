import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import React, { useState } from "react";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { Input } from "@material-ui/core";
import { Checkbox } from "@material-ui/core";
import { ListItemText } from "@material-ui/core";
import { getAllCategories } from "../../redux/actions/getAllCategories";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import {Link} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(2),
    width: '70vh',
    display: 'absolute',
    justifyContent: 'center'
  },
  btnBack: {
    backgroundColor: '#16222A',
    color:'white',
    "&:hover": {
        backgroundColor: theme.palette.primary.light
    }
  },
  btnPublicar: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
    },
    marginTop: '1vh'
    
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.primary.contrastText   
  },
  
}));

function AddProduct() {

  const classes = useStyles();
  const [val, setVal] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null)
  const [input, setInput] = useState({
    name: "",
    price: "",
    description: "",
    brand: "",
    stock: "",
    categories: [],
    image: "",
  });
  const category = ["Guitarra", "Bajo", "Violín", "Piano"];

  const categories = useSelector(({ app }) => app.categoriesLoaded);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (event) => {
    setVal(event.target.value);
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/products', input)
    console.log(input);
  };

  // const handleUpload = (e) => {
  //   let img = e.target.files[0];
  //   setInput({
  //     ...input,
  //     [e.target.name]: URL.createObjectURL(img),
  //   });
  // }

  // const handleUploadClick = event => {
  //   console.log();
  //   var file = event.target.files[0];
  //   const reader = new FileReader();
  //   var url = reader.readAsDataURL(file);

  //   reader.onloadend = function(e) {
  //     setSelectedFile([reader.result])
  //   }.bind(this);
  //   console.log(url); // Would see a path?

  //   setSelectedFile(event.target.files[0])
  // };

  return (
    <div>
      <FormControl
        className={classes.formControl}
        onSubmit={handleSubmit}
        
      >
        
        {/* <input
              accept="image/*"
              name='image'
              className={classes.input}
              id="contained-button-file"
              multiple
              type="file"
              onChange={handleUpload}
            /> */}
          <TextField
            required
            name="name"
            label="Producto"
            variant="outlined"
            onChange={handleInputChange}
            
          />
          <TextField
            required
            name="image"
            label="Imagen URL"
            variant="outlined"
            onChange={handleInputChange}
          />
          <TextField
            required
            name="price"
            label="Precio"
            variant="outlined"
            type="number"
            onChange={handleInputChange}
          />
          <TextField
            required
            name="brand"
            label="Marca"
            variant="outlined"
            onChange={handleInputChange}
          />
          <TextField
            required
            name="stock"
            label="Unidades disponibles"
            variant="outlined"
            type="number"
            onChange={handleInputChange}
          />
          <FormControl variant="outlined">
            <InputLabel>Categorías</InputLabel>
            <Select
              multiple
              variant="outlined"
              value={val}
              name="categories"
              onChange={handleSelectChange}
              input={<Input />}
              renderValue={(selected) => selected.join(", ")}
            >
              {categories.map((category) => (
                <MenuItem key={category.name} value={category.name}>
                  <Checkbox checked={val.indexOf(category.name) > -1} />
                  <ListItemText primary={category.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        
        <div>
          <TextField
            id="standard-multiline-static"
            name="description"
            label="Descripción"
            multiline
            variant="outlined"
            rows={4}
            fullWidth
            onChange={handleInputChange}
          />
        </div>
        <Button type="submit" className = {classes.btnPublicar}>
          Publicar
        </Button>

          <div style = {{display: 'flex', justifyContent: 'space-evenly', marginTop: '5vh'}}>
            <Link to='/' className = {classes.link}>
                <Button variant="contained" className = {classes.btnBack}>Home</Button>
            </Link>
            <Link to='/adminpanel' className = {classes.link}>
                <Button variant="contained" className = {classes.btnBack}>Volver</Button>
            </Link>
        </div>
      </FormControl>

     
           
    </div>
  );
}

export default AddProduct;
