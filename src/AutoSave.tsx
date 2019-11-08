import * as React from 'react';

import {  useFormikContext } from 'formik';
import debounce from 'lodash.debounce';

interface IAutoSaveContext{
  pause:(pause:boolean)=>void
}

export const AutoSaveContext = React.createContext<IAutoSaveContext>({pause:()=>{}})

export function AutoSave ({ delayMs,pause }:{delayMs:number, pause: boolean}) {
    const ctx = useFormikContext();
    const debouncedSubmit = React.useCallback(
      debounce(() => {
        if (ctx.dirty&&!pause) {
          ctx.submitForm().then(()=>{

          })
        }
      }, delayMs),
      [delayMs, ctx.dirty, ctx.submitForm,pause]
    );
  
    React.useEffect(() => {
      if(!pause){
        debouncedSubmit();
      }
    }, [debouncedSubmit, ctx.values,pause]);

    return null
  };

  export function AutoSaveProvider({children}:{children:React.ReactElement|React.ReactElement[]}) {
    const [pause,setPause]=React.useState(false)
    const value = React.useMemo(()=>({
      pause:(value:boolean)=>setPause(value)
    }),[pause])
    return <AutoSaveContext.Provider value={value}>{children}<AutoSave delayMs={1000} pause={pause}/></AutoSaveContext.Provider>
  }