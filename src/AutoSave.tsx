import * as React from 'react';

import {  useFormikContext } from 'formik';
import debounce from 'lodash.debounce';

export function AutoSave ({ delayMs }:{delayMs:number}) {
    const ctx = useFormikContext();
    const debouncedSubmit = React.useCallback(
      debounce(() => {
        if (ctx.dirty) {
          ctx.submitForm().then(()=>{

          })
        }
      }, delayMs),
      [delayMs, ctx.dirty, ctx.submitForm]
    );
  
    React.useEffect(() => {
      debouncedSubmit();
    }, [debouncedSubmit, ctx.values]);

    return null
  };