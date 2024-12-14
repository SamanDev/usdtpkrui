import { FastField } from "formik";
import React from "react";
import { Label, Form } from "semantic-ui-react";
String.prototype.capitalize = function(allWords) {
  return (allWords) ? // If all words
     this.split(' ').map(word => word.capitalize()).join(' ') : // Break down the phrase to words and then recursive
                                                                // calls until capitalizing all words
     this.charAt(0).toUpperCase() + this.slice(1); // If allWords is undefined, capitalize only the first word,
                                                   // meaning the first character of the whole string
}
const InputF = ({
  formik,
  type,
  name,
  icon,
  label,
  labelcolor,
  size,
  autoComplete,
  maxLength,
  placeholder,disabled
}) => {
  return (
    <Form as="div">
      {formik.errors[name] && formik.touched[name] && (
        <Label className="farsi" basic color="red" pointing="below" size={size}>
          {formik.errors[name]}
        </Label>
      )}
      <Form.Input
        size={size}
        fluid
        labelPosition="left"
        defaultValue=""
        style={{ marginBottom: 10 }}
        disabled={disabled}
      >
        <Label
          size="tiny"
          pointing="right"
         
          color={
            formik.errors[name] && formik.touched[name] ? "red" : labelcolor
          }
          className="farsi"
        >
          {label}
        </Label>
        <FastField
          type={type}
          name={name}
          placeholder={placeholder?placeholder.capitalize(true):name.capitalize(true)}
          autoComplete={autoComplete}
          maxLength={maxLength}
          disabled={disabled}
        />
      </Form.Input>
    </Form>
  );
};

export default InputF;
