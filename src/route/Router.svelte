<script lang="ts">
  import { setContext } from "svelte";
  import type { History, Location } from "history";
  import {createBrowserHistory} from "history";
  
  const historyRef: History = createBrowserHistory()
  let currentLocation = historyRef.location
  historyRef.listen(({location}) => currentLocation = location)()
    
  setContext<History | undefined>("HistoryContext", historyRef)
  setContext<Location | undefined>("LocationContext", currentLocation)
  setContext<string | undefined>("PathContext", '/')

</script>


<div>
  <slot name="path">not path</slot>
</div>