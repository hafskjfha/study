#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <stdlib.h>

#define ll long long
#define mod(a, b) (((a) % (b) + (b)) % (b)) // 모듈로 양수 전처리문

typedef struct EEA_RESULT {
	int gcd;
	int x;
	int y;
} EEA_RESULT;

int gcd(int a, int b) {
	if (b == 0) return a;

	// use EA and while
	int temp;
	while (b != 0) {
		temp = a % b;
		a = b;
		b = temp;
	}
	return a;

	// use EA and 재귀
	// return gcd(b, a % b)
}

EEA_RESULT extended_gcd_with_while(int a, int b) {
	// use EEA
	int s0 = 1, s1 = 0;
	int t0 = 0, t1 = 1;
	int q, temp;

	while (b != 0) {
		q = a /b;
		temp = a % b;
		a = b;
		b = temp;

		temp = s1;
		s1 = s0 - q * s1;
		s0 = temp;

		temp = t1;
		t1 = t0 - q * t1;
		t0 = temp;
	}

	EEA_RESULT result;
	result.gcd = a;
	result.x = s0;
	result.y = t0;

	return result;
}

EEA_RESULT extended_gcd_with_recursion(int a, int b) {
	// use EEA
	if (a == 0) {
		EEA_RESULT result;
		result.gcd = b;
		result.x = 0;
		result.y = 1;
		return result;
	}

	EEA_RESULT temp = extended_gcd_with_recursion(b % a, a);

	EEA_RESULT result;
	result.gcd = temp.gcd;
	result.x = temp.y - (b / a) * temp.x;
	result.y = temp.x;

	return result;
}

int modular_inverse(int a, int m) {
	// 모듈로 역원 (a * x \equiv 1 (mod m) 인 x찾기)
	EEA_RESULT result = extended_gcd_with_while(a, m);
	if (result.gcd != 1) return -1;

	return mod(result.x, m);
}

int main(void) {
	printf("gcd(1071, 1029) = %d\n",gcd(1029,1071));

	EEA_RESULT result = extended_gcd_with_while(1071,1029);
	printf("gcd(1071, 1029)=%d, x=%d, y=%d\n",result.gcd, result.x, result.y);

	EEA_RESULT result2 = extended_gcd_with_recursion(1071, 1029);
	printf("gcd(1071, 1029)=%d, x=%d, y=%d\n", result2.gcd, result2.x, result2.y);

	printf("법 7에 대해서 5의 역원은 %d이다.", modular_inverse(5,7));
}