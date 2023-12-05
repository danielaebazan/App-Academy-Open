1. Unmounted.js - history pus => push
2. -- add const history = useHistory(); first
3. RandomUser - localStorage.setItem -> getItem("user")||"foobar"
4. -- fetchUser = async
5. call fetchUser();
6. getItem -> setItem
7. add [setUser] to first fetch for listening (or also join 2 setEffect )
8. remove 'foobar' to randomize first user (set '' or null)
9. setSearchWord(searchChange); - add check if (searchChange) <without it after user submit can be sumbitted empty username to random>
10. clearInterval add

no errors in Sandbox console (from app)
Also are scope warning and sourcemap errors in Chrome console because of sandbox.
