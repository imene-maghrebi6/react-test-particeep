import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles((theme) => ({
  control: {
    minWidth: 200,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: '50px'
  },
  chip: {
    margin: 2,
  },
 
}));

function getStyles(element, category, theme) {
  return {
    fontWeight:
    category.indexOf(element) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const CategoriesSelect = ({handleCategoryChange, selectedCategories, categories}) => {
    const classes = useStyles();
    const theme = useTheme();
    return (
      <>
        <FormControl className={classes.control}>
          <InputLabel id="demo-mutiple-chip-label">Categories</InputLabel>
          <Select
            className={classes.select}
            labelId="demo-mutiple-chip-label"
            id="demo-mutiple-chip"
            multiple
            value={selectedCategories}
            onChange={handleCategoryChange}
            input={<Input id="select-multiple-chip" />}
            renderValue={(selected) => (
              <div className={classes.chips}>
                {selected.map((value) => (
                  <Chip key={value} label={value} className={classes.chip} />
                ))}
              </div>
            )}
          >
          {categories.map((category) => (
            <MenuItem key={category} value={category} style={getStyles(category, selectedCategories, theme)}>
              {category}
            </MenuItem>
            ))}
          </Select>
        </FormControl>
      </>
  );
} 

export default CategoriesSelect
