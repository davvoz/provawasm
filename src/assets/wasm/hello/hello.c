#include <emscripten.h>

int EMSCRIPTEN_KEEPALIVE procedure(int n)
{
    return n * n;
}