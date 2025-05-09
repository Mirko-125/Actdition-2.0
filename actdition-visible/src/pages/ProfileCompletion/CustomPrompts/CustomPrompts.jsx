import React from "react";
import styles from './CustomPrompts.module.css';

function CustomPrompts( { unfinished_user } ) 
{
    // unfinished_user["test"] = "volimte";
    // console.table(unfinished_user);

    // ili da obrises kreaciju korisnika pri registraciji, ili da ovde napravis potpunog registrovanog korisnika pa da ga obrises iz prethodnog pokusaja

    // double value input
    // date picker
    // textbox

    // fetch dropdown


    switch (unfinished_user.position) {
        case "actor":
            return (
                <>
          
                </>
            );
        case "castingdirector":
            return (
                <>
          
                </>
            );
        case "producer":
            return (
                <>
          
                </>
            );
        default:
            return (
                <>
                    Neki eror koji ces blagovremeno napisati 😉
                </>
            );
    }
  }
  
  export default CustomPrompts;
  