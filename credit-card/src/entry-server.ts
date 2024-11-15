export function render() {
  const html = `
    <div>
      <form class="payment-form">
        <form-title></form-title>
        <div class="form-fields">
          <card-name></card-name>
          <div class="form-fields-row">
            <card-number></card-number>
            <card-expiration-date></card-expiration-date>
          </div>
          <card-verification-code></card-verification-code>
        </div>
      </form>
    </div>
  `
  return { html }
}
