using DTO;
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

        [HttpPost]
        public IActionResult Ponto(List<PontoDTO> pontos)
        {
            try
            {
                var response = ParsePonto.Parser(pontos);
                return Ok(response);

            }catch (OperationCanceledException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                var entity = new JsonResult("Erro inesperado: " + ex.Message)
                {
                    StatusCode = 500
                };
                return entity;
            }
        }
    }
}
