import ServiceBase from '../lib/types/service';

class Example extends ServiceBase {
  test(str: string) {
    return `test: 「${str}」, time: ${new Date().getTime()}`;
  }

  xxx() {
    const option = {
      method: 'POST',
      headers: {},
      body: JSON.stringify({
        
      })
    };
    return this.ctx.req.fetch('', option)
      .then(res => {
        this.ctx.log.write(`status: ${res.status}, text: ${res.statusText}`);
        return res;
      })
      .then(res => res.json())
      .then(res => {
        this.ctx.log.writeObj(res); // for test
        if (!res.code) {
          return res.data;
        } else {
          this.ctx.log.write(`error: ${res.msg}`);
          return null;
        }
      });
  }
}

export default Example;
