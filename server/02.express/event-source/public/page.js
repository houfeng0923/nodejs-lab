var source = new EventSource('/stats');
source.addEventListener('message', handleCallback, false);


function handleCallback(msg) {
  JSON.parse(msg.data)
}