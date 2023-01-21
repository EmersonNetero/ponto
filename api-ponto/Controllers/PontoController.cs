using Microsoft.AspNetCore.Mvc;

namespace api_ponto.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class PontoController : ControllerBase
    {

        public PontoController()
        {}
        [HttpGet]
        public IActionResult TestePonto()
        {
            return Ok("Ponto");
        }
    }
}
