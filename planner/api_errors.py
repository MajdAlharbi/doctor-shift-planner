from rest_framework.response import Response


def error_response(code: str, message: str, status: int):
    """
    Standard API error response helper.

    Example:
    {
        "error": {
        "code": "INVALID_REQUEST",
        "message": "week_start is required"
        }
    }
    """
    return Response(
        {
            "error": {
                "code": code,
                "message": message,
            }
        },
        status=status,
    )
